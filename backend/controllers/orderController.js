import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import delBoyModel from "../models/delBoyModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req , res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const subtotal = req.body.amount;
        const gst = (subtotal * 12)/100;
        var deliveryCharge = 0;
        const delType = req.body.type;
        if(delType == "Home Delivery")
        {
            deliveryCharge = 50;
        }
        const total = Number((subtotal + gst + deliveryCharge).toFixed(2));
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            delType: delType,
            amount: total
        })
        
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price*100)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name: "GST"
                },
                unit_amount: Math.round(gst * 100)
            },
            quantity: 1
        })

        if(delType == "Home Delivery"){
            line_items.push({
                price_data:{
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: Math.round(deliveryCharge * 100)
                },
                quantity: 1
            })
        }

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        await newOrder.save();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), 
            currency: "inr",
            metadata: { orderId: newOrder._id.toString() }, 
        });

        newOrder.paymentIntentId = paymentIntent.id;
        await newOrder.save();
        res.status(200).json({ success: true , session_url: session.url });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const verifyOrder = async (req , res) => {
    const {orderId , success , userid} = req.body;
    try {
        if(success=="true"){
            await userModel.findByIdAndUpdate(userid, {cartData:{}});
            await orderModel.findByIdAndUpdate(orderId , {payment: true});
            res.status(200).json({ success: true , message: "Paid" });
        }    
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(402).json({ success: true , message: "Not Paid" });
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const userOrder = async (req , res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId , payment: true}).sort({ createdAt: -1 });;
        res.status(200).json({success: true , data: orders});    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const listOrders = async (req , res) => {
    try {
        const orders = await orderModel.aggregate([
            {
                $match: { payment: true }
            },
            {
                $sort: { createdAt: -1 } 
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "userId", 
                    foreignField: "_id", 
                    as: "userData"
                }
            },
            { $unwind: "$userData" },
            {
                $lookup: {
                    from: "users",
                    localField: "delBoyId",
                    foreignField: "_id",
                    as: "delBoyData"
                }
            },
            { $unwind: { path: "$delBoyData", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    userId: 1,
                    delBoyId: 1,
                    items: 1,
                    delType: 1,
                    amount: 1,
                    status: 1,
                    date: 1,
                    payment: 1,
                    "userData.name": 1,   
                    "userData.email": 1,
                    "userData.contact": 1,
                    "userData.address": 1,
                    "userData.city": 1,
                    "userData.country": 1,
                    "delBoyData.name": 1,
                    "delBoyData.contact": 1
                }
            }
        ]);
        
        res.status(200).json({success: true , data: orders});   
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const updateStatus = async (req , res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId , {status: req.body.status});
        res.status(200).json({ success: true , message: "Status Updated" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const cancelOrder = async (req , res) => {
    try{
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "Canceled" || order.status === "Out for Delivery") {
            return res.status(400).json({ message: "Order cannot be canceled" });
        }

        if(order.payment){
            const paymentIntentId = order.paymentIntentId;
            if (!paymentIntentId) {
                return res.status(400).json({ message: "Payment ID not found" });
            }
            
            const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
            });

            if (refund.status !== "succeeded") {
                return res.status(500).json({ message: "Refund failed" });
            }
        }

        order.status = "Canceled";
        await order.save();
        res.json({ message: "Order canceled successfully", order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const assignDelBoy = async (req , res) => {
    try {
        const { orderId , delBoyId } = req.body;

        const delBoy = await delBoyModel.findOne({ _id: delBoyId, isAvailable: true });

        if (!delBoy) {
            return res.status(400).json({ success: false, message: "No available delivery boy found" });
        }

        await orderModel.findByIdAndUpdate(orderId, { delBoyId: delBoyId });
        await delBoyModel.findByIdAndUpdate(delBoyId, { isAvailable: false });

        res.status(200).json({ success: true, message: "Delivery Boy Assigned" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error assigning delivery boy" });
    }
}

export { placeOrder , verifyOrder , userOrder , listOrders , cancelOrder , updateStatus , assignDelBoy }
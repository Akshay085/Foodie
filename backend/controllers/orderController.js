import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import delBoyModel from "../models/delBoyModel.js";
import { sendMail } from "../helper/sendMail.js";
import { billMail } from "../public/usersEmail/billMail.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const cashOnDel = async (req , res) => {
    try {
        var subtotal = req.body.amount;
        const gst = (subtotal * 12)/100;
        var deliveryCharge = 0;
        const delType = req.body.type;
        if(delType == "Home Delivery" && subtotal < 1000) {
          deliveryCharge = 50;
        }
        if(subtotal >= 1000){
          const discount = (subtotal * 20)/100;
          subtotal = subtotal - discount;
        }
        const amount = Number((subtotal + gst + deliveryCharge).toFixed(2));
        const newOrder = new orderModel({
          userId: req.body.userId,
          items: req.body.items,
          delType: delType,
          subTotal: subtotal,
          gst: gst,
          delCharge: deliveryCharge,
          amount: amount,
          payment: true, // Mark as unpaid initially
          paymentMethod: "Cash",
        });
        await newOrder.save();
        // Optionally send email confirmation
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});
        const user = await userModel.findById({_id: req.body.userId});
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const emailTemplate = billMail(newOrder);
        sendMail(user.email , "Order Successfull! Here is your Bill" ,  emailTemplate);
        res.status(200).json({ success: true , message: "Paid" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error placing order"});
    }
}

const placeOrder = async (req , res) => {
    
    try {
        var subtotal = req.body.amount;
        const gst = (subtotal * 12)/100;
        var deliveryCharge = 0;
        const delType = req.body.type;
        if(delType == "Home Delivery" && subtotal < 1000)
        {
            deliveryCharge = 50;
        }
        if(subtotal >= 1000){
            const discount =  (subtotal * 20)/100;
            subtotal = subtotal - discount;
        }
        const amount = Number((subtotal + gst + deliveryCharge).toFixed(2));
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            delType: delType,
            subTotal: subtotal,
            gst: gst,
            delCharge: deliveryCharge,
            amount: amount,
            paymentMethod: "Online Payment",
        })
        
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round((item.price*100)*80/100)
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
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
        });
        
        await newOrder.save();
        res.status(200).json({ success: true , session_url: session.url });
    } 
    catch (error) {
        res.status(500).json({success: false , message: "Error"});
    }
}

const verifyOrder = async (req , res) => {
    const {orderId , success , userid} = req.body;
    try {
        const order = await orderModel.findById({_id: orderId});
        if(!order){
            return res.status(404).json({success: false , message: "Order Doesn't exist"});
        }
        if(success=="true"){
            await userModel.findByIdAndUpdate(userid, {cartData:{}});
            const newOrder = await orderModel.findByIdAndUpdate(orderId , {payment: true});

            const user = await userModel.findById({_id: userid});
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const emailTemplate = billMail(newOrder);
            sendMail(user.email , "Order Successfull! Here is your Bill" ,  emailTemplate);
            res.status(200).json({ success: true , message: "Paid" });
        }    
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(402).json({ success: true , message: "Not Paid" });
        }
    } 
    catch (error) {
        res.status(500).json({success: false , message: "Error"});
    }
}

const userOrder = async (req , res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId , payment: true}).sort({ createdAt: -1 });;
        res.status(200).json({success: true , data: orders});    
    } 
    catch (error) {
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
                    subTotal: 1,
                    gst: 1,
                    amount: 1,
                    status: 1,
                    date: 1,
                    payment: 1,
                    paymentMethod: 1,
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
        res.status(500).json({success: false , message: "Error"});
    }
}

const updateStatus = async (req , res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId , {status: req.body.status});
        res.status(200).json({ success: true , message: "Status Updated" });
    } 
    catch (error) {
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

        if (order.status === "Cancelled" || order.status === "Out for Delivery" || order.status === "Receive Order") {
            return res.status(400).json({ message: "Order cannot be cancelled" });
        }

        order.status = "Cancelled";
        await order.save();

        const delBoyId = order.delBoyId;

        if(delBoyId != null){
            const delBoy = await delBoyModel.findById(delBoyId);
            if (!delBoy){
                return res.status(404).json({ message: "Order not found" });
            }

            delBoy.isAvailable = true;
            await delBoy.save();
        }

        res.json({ success: true , message: "Order cancelled successfully", order });
    }
    catch (error) {
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
        res.status(500).json({ success: false, message: "Error assigning delivery boy" });
    }
}

export { placeOrder , verifyOrder , userOrder , listOrders , cancelOrder , updateStatus , assignDelBoy , cashOnDel }
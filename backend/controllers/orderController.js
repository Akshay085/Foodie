import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req , res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const subtotal = req.body.amount;
        const gst = (subtotal * 12)/100;
        const total = subtotal + gst + 50;
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: total
        })
        await newOrder.save();

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name: "GST"
                },
                unit_amount: gst * 100
            },
            quantity: 1
        })


        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 50*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        
        res.status(200).json({ success: true , session_url: session.url });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const verifyOrder = async (req , res) => {
    const {orderId , success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId , {payment: true});
            await userModel.findByIdAndUpdate(req.body.userId , {cartData:{}});
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
        const orders = await orderModel.find({userId: req.body.userId});
        res.status(200).json({success: true , data: orders});    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

export { placeOrder , verifyOrder , userOrder }
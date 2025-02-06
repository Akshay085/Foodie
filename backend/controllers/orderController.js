import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req , res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId , {cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 0.012)
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verfiy?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verfiy?success=false&orderId=${newOrder._id}`
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

export { placeOrder , verifyOrder }
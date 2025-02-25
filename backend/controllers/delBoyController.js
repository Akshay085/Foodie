import delBoyModel from '../models/delBoyModel.js';
import orderModel from '../models/orderModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { sendMail } from "../helper/sendMail.js";
import { registerMail } from '../public/delBoyEmail/registerMail.js';
import { loginMail } from '../public/delBoyEmail/loginMail.js';
import { otpMail } from '../public/delBoyEmail/otpMail.js';
import crypto from 'crypto';

const generateOTP = (length = 6) => {
    const otp = crypto.randomInt(100000, 999999); 
    const expiryTimestamp = Date.now() + 3 * 60 * 1000;
    return  {otp , expiryTimestamp};
}

const createToken = (id) => {
    return jwt.sign( {id} , process.env.JWT_SECRET );
}

const listDelBoy = async (req , res) => {
    try {
        const delBoy = await delBoyModel.find({});
        res.status(200).json({success: true , data: delBoy});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const loginDelBoy = async (req , res) => {
    const {email , password} = req.body;
    try {
        const delBoy = await delBoyModel.findOne({email});
        
        if(!delBoy){
            return res.status(404).json({success: false , message: "Delivery Boy Doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password , delBoy.password);
        
        if(!isMatch){
            return res.status(401).json({success: false , message: "Invalid Credentials"});
        }
        
        const token = createToken(delBoy._id);
        let data = {
            name: delBoy.name
        }

        const generateEmail = (template, data) => {
            return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
        };
        let template = generateEmail(loginMail, data);
        sendMail(email , "Login Successful - Welcome Back!" ,  `${template}`);
        const delBoyData = {
            _id: delBoy._id,
            name: delBoy.name,
            email: delBoy.email,
            contact: delBoy.contact,
            address: delBoy.address,
            city: delBoy.city,
            country: delBoy.country
        }
        res.status(200).json({success: true , token , delBoyData});
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const registerDelBoy = async (req , res) => {
    const {name , email , contact , password , address , city ,country} = req.body;

    try {
        const exists = await delBoyModel.findOne({email});
        if(exists){
            return res.status(409).json({success: false , message: "Delivery Boy already exists"});
        }
    
        if(!validator.isEmail(email)){
            return res.status(401).json({success: false , message: "Please enter valid email"});
        }
    
        if(password.length < 8){
            return res.status(401).json({success: false , message: "Please enter strong password"});
        }

        if(!validator.isMobilePhone(contact , 'en-IN')){
            return res.status(401).json({success: false , message: "Please enter valid phone Number"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);  
        
        const newDelBoy = new delBoyModel({
            name: name,
            email: email,
            contact: contact,
            password: hashPassword,
            address: address,
            city: city,
            country: country
        });

        const delBoy = await newDelBoy.save();

        const token = createToken(delBoy._id);

        let data = {
            name
        }

        const generateEmail = (template, data) => {
            return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
        };
        let template = generateEmail(registerMail, data);
        sendMail(email , "Registration Successful - Welcome to FOODIES!" , ` ${template}`);
        res.status(201).json({success: true , token});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const sendOtp = async (req , res) => {
    try {
        const { email } = req.body;
        const delBoy = await delBoyModel.findOne({email});

        if(!delBoy){
            return res.status(404).json({success: false , message: "Delivery Boy Doesn't exist"});
        }
        const token = createToken(delBoy._id);
        const {otp , expiryTimestamp} = generateOTP();
        const newOtp = {
            otp: otp,
            expriredOn: expiryTimestamp,
        }
        const update = await delBoyModel.findOneAndUpdate({email}, newOtp , { new: true } );

        let data = {
            otp: otp
        }
        const generateEmail = (template, data) => {
            return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
        };
        let template = generateEmail(otpMail, data);
        sendMail(email , "Reset Your Password - OTP Inside" , ` ${template}`);
        res.status(201).json({success: true , token});
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const verifyOtp = async (req , res)=> {
    try {
        const { email , otp } = req.body;
        const delBoy = await delBoyModel.findOne({email});
        const otpNumber = parseInt(otp);
        if(!delBoy) {
            return res.status(404).json({success: false , message: "Delivery Boy Doesn't exist"});
        }

        if(!delBoy.otp || !delBoy.expriredOn) {
            return res.status(400).json({success: false , message: "OTP not generated"});
        }

        if(Date.now() > delBoy.expriredOn) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        if(delBoy.otp !== otpNumber) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        delBoy.otp = "";
        delBoy.expiredOn = null;
        await delBoy.save();

        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } 
    catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updatePassword = async (req , res) => {
    try {
        const {email , newPassword} = req.body;
        const delBoy = await delBoyModel.findOne({email});
        
        if(!delBoy) {
            return res.status(404).json({success: false , message: "Delivery Boy Doesn't exist"});
        }

        if(newPassword.length < 8){
            return res.status(401).json({success: false , message: "Please enter strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword , salt);

        delBoy.password = hashPassword;
        await delBoy.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } 
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const listOrders = async (req , res) => {
    try {
        const delBoyId = new mongoose.Types.ObjectId(req.body.delBoyId);
        const orders = await orderModel.aggregate([
            {
                $match: { delBoyId: delBoyId }
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

const updateStatusByDelBoy = async (req , res) => {
    try{
        const { orderId, delBoyId, status } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.delBoyId.toString() !== delBoyId) {
            return res.status(403).json({ success: false, message: "Not authorized to update this order" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });

        if (status === "Delivered") {
            await delBoyModel.findByIdAndUpdate(delBoyId, { isAvailable: true });
        }

        res.status(200).json({ success: true, message: "Order status updated" });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
}

const getAvailableDelBoys = async (req, res) => {
    try {
        const delBoys = await delBoyModel.find({ isAvailable: true });

        res.status(200).json({ success: true, data: delBoys });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching available delivery boys" });
    }
};


export { registerDelBoy , loginDelBoy , listDelBoy , sendOtp , verifyOtp , updatePassword , listOrders , updateStatusByDelBoy , getAvailableDelBoys }
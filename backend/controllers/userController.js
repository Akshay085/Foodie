import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { sendMail } from "../helper/sendMail.js";
import { loginMail } from "../public/loginMail.js";
import { registerMail } from "../public/registerMail.js";
import { otpMail } from "../public/otpMail.js";
import crypto from 'crypto';

const generateOTP = (length = 6) => {
    const otp = crypto.randomInt(100000, 999999); 
    const expiryTimestamp = Date.now() + 3 * 60 * 1000;
    return  {otp , expiryTimestamp};
}

// login user
const loginUser = async (req , res) => {
    const {email , password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({success: false , message: "User Doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(401).json({success: false , message: "Invalid Credentials"});
        }

        const token = createToken(user._id);
        let data = {
            name: user.name
        }

        const generateEmail = (template, data) => {
            return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
        };
        let template = generateEmail(loginMail, data);
        sendMail(email , "Welcome to our FOODIES Website" ,  `${template}`);
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            address: user.address,
            city: user.city,
            country: user.country
        }
        res.status(200).json({success: true , token , userData});
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }

} 

const createToken = (id) => {
    return jwt.sign( {id} , process.env.JWT_SECRET );
}

// register user
const registerUser = async (req , res) => {
    const {name , email , contact , password} = req.body;
    
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(409).json({success: false , message: "User already exists"});
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

        const newUser = new userModel({
            name: name,
            email: email,
            contact: contact,
            password: hashPassword
        });

        const user = await newUser.save();
        
        const token = createToken(user._id);

        let data = {
            name
        }

        const generateEmail = (template, data) => {
            return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
        };
        let template = generateEmail(registerMail, data);
        sendMail(email , "Welcome to our FOODIES Website" , ` ${template}`);
        res.status(201).json({success: true , token});

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
     
}

const sendOtp = async(req , res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({success: false , message: "User Doesn't exist"});
        }
        const token = createToken(user._id);
        const {otp , expiryTimestamp} = generateOTP();
        const newOtp = {
            otp: otp,
            expriredOn: expiryTimestamp,
        }
        const update = await userModel.findOneAndUpdate({email}, newOtp , { new: true } );

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
        const user = await userModel.findOne({email});
        const otpNumber = parseInt(otp);
        if(!user) {
            return res.status(404).json({success: false , message: "User Doesn't exist"});
        }

        if(!user.otp || !user.expriredOn) {
            return res.status(400).json({success: false , message: "OTP not generated"});
        }

        if(Date.now() > user.expriredOn) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        if(user.otp !== otpNumber) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        user.otp = "";
        user.expiredOn = null;
        await user.save();

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
        const user = await userModel.findOne({email});
        
        if(!user) {
            return res.status(404).json({success: false , message: "User Doesn't exist"});
        }

        if(password.length < 8){
            return res.status(401).json({success: false , message: "Please enter strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword , salt);

        user.password = hashPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } 
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const resetPassword = async (req , res) => {
    try {
        const { oldPassword , newPassword } = req.body;
        const user = await userModel.findById(req.body._id);

        if(!user) {
            return res.status(404).json({success: false , message: "User Doesn't exist"});
        }

        const isMatch = await bcrypt.compare(oldPassword , user.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const isMatchPassword = await bcrypt.compare(newPassword , user.password);

        if(isMatchPassword){
            return res.status(422).json({success: false , message: "Old Password and New Password to simler"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword , salt);

        user.password = hashPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } 
    catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateUser = async(req , res) => {
    try{
        const user = await userModel.findById(req.body._id).exec();
        
        if (!user) {
            return res.status(404).json({success: false,message: "User not found",});
        }

        if(req.body.contact){
            const contact = String(req.body.contact);

            if(!validator.isMobilePhone(contact , 'en-IN')){
                return res.status(401).json({success: false , message: "Please enter valid phone Number"});
            }
        }
        
        const newUser = { 
            _id: user._id,
            name: req.body.name || user.name,
            email: user.email,
            contact: req.body.contact || user.contact,
            address: req.body.address || user.address, 
            city: req.body.city || user.city,
            country: req.body.country || user.country
        };
        
        const update = await userModel
        .findByIdAndUpdate(req.body?._id , newUser , { new: true })
        .then(async (update) => {
            return {
                status: true,
                message: "Updated",
                code: 200,
                data: newUser
            };
        })
        .catch((error) => {
            return {
              status: false,
              message: error?.message,
              code: 200,
            };
          });
        res.status(200).json(update);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

export { loginUser , registerUser , sendOtp , verifyOtp , updatePassword , resetPassword  , updateUser }
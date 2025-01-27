import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

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
        res.status(200).json({success: true , token });
        
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
        res.status(201).json({success: true , token});

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
     
}

const updateUser = async(req , res) => {
    try{

    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

export { loginUser , registerUser }
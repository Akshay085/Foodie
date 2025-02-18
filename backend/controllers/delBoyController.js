import delBoyModel from '../models/delBoyModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';

const createToken = (id) => {
    return jwt.sign( {id} , process.env.JWT_SECRET );
}

const registerDelBoy = async (req , res) => {
    const {name , email , contact , password , address , city ,country} = req.body;

    try {
        const exists = await delBoyModel.findOne({email});
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

        res.status(201).json({success: true , token});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

export { registerDelBoy }
import categoryModel from "../models/categoryModel.js";
import { uploadResult } from "../utils/cloudinary.js";
import {v2 as cloudinary} from'cloudinary';

const addCategory = async (req , res) => {
    try {
        let image_filename = await uploadResult(req.file.path);
        const category = new categoryModel({
            name: req.body.name,
            image: image_filename.secure_url,
            cloudinary_id: image_filename.public_id,
        });
    
        await category.save();
        res.status(201).json({success: true , message: "Category Added"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const listCategory = async (req , res) => {
    try {
        const categorys = await categoryModel.find({});
        res.status(200).json({success: true , data: categorys});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const removeCategory = async (req , res) => {
    try {
        const category = await categoryModel.findById(req.body.id);
        await cloudinary.uploader.destroy(category.cloudinary_id);
        await categoryModel.findByIdAndDelete(category._id);
        res.status(200).json({success: true , message: "Category Remove"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

const editCategory = async (req , res) => {
    try {
        const category = await categoryModel.findById(req.body._id).exec();
        
        
        let image_filename;
        if(req.file){
            await cloudinary.uploader.destroy(category?.cloudinary_id);
            image_filename = await uploadResult(req.file.path);
        }
        
        const newCategory = {
            name: req.body.name || category.name,
            image: req.body.image || image_filename.secure_url,
            cloudinary_id: req.body.cloudinary_id || image_filename?._public_id,
        };


        await categoryModel.findByIdAndUpdate(req.body._id , newCategory , {new: true});
        res.status(200).json({success: true , message: "Category Updated"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});
    }
}

export { addCategory , listCategory , removeCategory , editCategory }
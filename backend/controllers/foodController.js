import foodModel from "../models/foodModel.js";
import { uploadResult } from "../utils/cloudinary.js";
import {v2 as cloudinary} from'cloudinary';

const addFood = async (req , res) => {
    try {
        let image_filename = await uploadResult(req.file.path);
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename.secure_url,
            cloudinary_id: image_filename.public_id,
        });
    
        await food.save();
        res.status(201).json({success: true , message: "Food Added"});
    } 
    catch (error) {

        res.status(500).json({success: false , message: "Error"});
    }
}

const listFood = async (req , res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({success: true , data: foods});
    } 
    catch (error) {

        res.status(500).json({success: false , message: "Error"});
    }
}

const removeFood = async (req , res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        await cloudinary.uploader.destroy(food.cloudinary_id);
        await foodModel.findByIdAndDelete(food._id);
        res.status(200).json({success: true , message: "Food Remove"});
    } 
    catch (error) {

        res.status(500).json({success: false , message: "Error"});
    }
}

const editFood = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body._id).exec();
  
      let image_filename;
      if (req.file) {
        await cloudinary.uploader.destroy(food?.cloudinary_id);
        image_filename = await uploadResult(req.file.path);
      }
  
      const newFood = {
        name: req.body.name || food.name,
        description: req.body.description || food.description,
        price: req.body.price || food.price,
        category: req.body.category || food.category,
        image: req.body.image || image_filename.secure_url,
        cloudinary_id: req.body.cloudinary_id || image_filename?.public_id,
      };
  
      const update = await foodModel
        .findByIdAndUpdate(req?.body?._id, newFood, { new: true })
        .then(async (update) => {
          return {
            status: true,
            message: "Updated",
            code: 200,
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
    } catch (error) {
      res.status(500).json({ success: false, message: "Error" });
    }
  };
  
export { addFood , listFood , removeFood , editFood }  
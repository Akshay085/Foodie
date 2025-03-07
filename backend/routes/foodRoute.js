import express from 'express';
import { addFood , listFood , removeFood , editFood } from '../controllers/foodController.js';
import upload from '../middleware/multer.js';

const foodRouter = express.Router();

foodRouter.post("/add" , upload.single("image") , addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove",removeFood);

foodRouter.post("/edit" , upload.single("image") , editFood);

export default foodRouter;
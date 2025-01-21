import express from 'express';
import { addCategory , listCategory , removeCategory , editCategory } from '../controllers/categoryController.js';
import upload from '../middleware/multer.js';

const categoryRouter = express.Router();

categoryRouter.post("/add" , upload.single("image") , addCategory);

categoryRouter.get("/list",listCategory);

categoryRouter.post("/remove",removeCategory);

categoryRouter.post("/edit/:id" , upload.single("image") , editCategory);

export default categoryRouter;
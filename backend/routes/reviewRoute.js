import express from 'express'; 
import { addReview, getReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/add" , addReview);
reviewRouter.post("/get" , getReview);

export default reviewRouter;
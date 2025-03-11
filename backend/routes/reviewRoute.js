import express from 'express'; 
import { addReview, getReview } from '../controllers/reviewController';

const reviewRouter = express.Router();

reviewRouter.post("/add" , addReview);
reviewRouter.post("/get" , getReview);

export default reviewRouter;
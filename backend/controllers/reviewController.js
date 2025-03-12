import reviewModel from "../models/reviewModel.js";

const addReview = async (req , res) => {
    try {
        const { orderId , userId , rating } = req.body;
       
        // Check if feedback already exists for this order
        const existingReview = await reviewModel.findOne({ orderId, userId });
    
        if (existingReview) {
          return res.json({ success: false, message: "You have already given Review for this order." });
        }
    
        const newReview = new reviewModel({ orderId, userId, rating });
        await newReview.save();
    
        res.json({ success: true, message: "Review added successfully!" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
    
const getReview = async (req , res) => {
    try {
        const { orderIds } = req.body;
        const reviews = await reviewModel.find({ orderId: { $in: orderIds } });
    
        // Convert to { orderId: rating } format
        const reviewMap = {};
        reviews.forEach(r => reviewMap[r.orderId] = r.rating);
    
        res.json({ success: true, review: reviewMap });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export {addReview , getReview};
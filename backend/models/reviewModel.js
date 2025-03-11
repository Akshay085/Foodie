import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "order" },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    rating: { type: Number}
},{timestamps: true});

const reviewModel = mongoose.models.review || mongoose.model("review",reviewSchema);

export default reviewModel;
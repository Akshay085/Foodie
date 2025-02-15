import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    items: { type: Array , required: true },
    delType: { type: String , required: true },
    amount: { type: Number , required: true },
    status: { type: String , default: "Food Processing" },
    date: { type: Date , default: Date.now() },
    payment: { type: Boolean , default: false }
},{timestamps: true});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;
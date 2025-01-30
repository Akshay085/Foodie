import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema({
    userId: { type: String , required: true },
    items: { type: Array , required: true },
    amount: { type: Number , required: true },
    address: { type: String , required: true },
    status: { type: String , default: "Food Processing" },
    datr: { type: Date , default: Date.now() }
});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;
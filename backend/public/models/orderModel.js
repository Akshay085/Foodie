import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    delBoyId: { type: mongoose.Schema.Types.ObjectId, ref: "delboys" , default: null },
    items: { type: Array , required: true },
    delType: { type: String , required: true },
    subTotal: { type: Number , required: true },
    gst: { type: Number , required: true },
    delCharge: { type: Number , required: true },
    amount: { type: Number , required: true },
    status: { type: String , default: "Food Processing" },
    date: { type: Date , default: Date.now() },
    payment: { type: Boolean , default: false }
},{timestamps: true});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;
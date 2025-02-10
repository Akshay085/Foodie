import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String , unique: true , required: true , maxlength: 30 },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true }
})

const categoryModel = mongoose.models.category || mongoose.model('category' , categorySchema);

export default categoryModel;
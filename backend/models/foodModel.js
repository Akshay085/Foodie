import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String , required: true , maxlength: 30},
    description: {type: String, required: true , maxlength: 400},
    price: {type: Number, required: true , minlength: 0},
    image: {type: String, required: true},
    category: {type: String, required: true},
    cloudinary_id: {type: String, required: true}
});

const foodModel = mongoose.models.food || mongoose.model('food' , foodSchema);

export default foodModel;
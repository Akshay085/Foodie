import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import 'dotenv/config';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET 
});

const uploadResult = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(filePath);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export {uploadResult}
       
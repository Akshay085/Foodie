import multer from "multer";

const storage = multer.diskStorage({});
    /*destination: "uploads",
    filename: (req , file , cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }*/


const upload = multer({
        storage: storage,
        limits: {
            fieldSize: 1024 * 1024 * 3,
        },
    });

export default upload;
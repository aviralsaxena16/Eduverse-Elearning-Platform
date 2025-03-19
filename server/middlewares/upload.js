import cloudinary from '../config/cloudinary.js';
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from 'multer'


const storage = new CloudinaryStorage({
  cloudinary:cloudinary, 
  params: {
    folder: "profile_pics", // Cloudinary folder where images will be stored
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export const upload = multer({ storage: storage });

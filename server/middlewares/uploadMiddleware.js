import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    // @ts-ignore
    folder: "profile_pics",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  // @ts-ignore
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      // @ts-ignore
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;

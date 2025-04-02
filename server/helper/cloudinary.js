import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new multer.memoryStorage();

async function ImageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}
const upload = multer({ storage });
export { upload, ImageUpload };

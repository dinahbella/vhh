import express from "express";
import { upload } from "../../helper/cloudinary.js";
import { handleImageUpload } from "../../controllers/admin/productsController.js";

const router = express.Router();

router.post("/upload-image", upload.single("vhh"), handleImageUpload);

export default router;

import express from "express";
import { upload } from "../../helper/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  handleImageUpload,
} from "../../controllers/admin/productsController.js";

const router = express.Router();

router.post("/upload-image", upload.single("vhh"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;

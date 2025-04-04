import express from "express";
import { getAllProducts } from "../../controllers/admin/productsController.js";

const router = express.Router();

router.post("/get", getAllProducts);

export default router;

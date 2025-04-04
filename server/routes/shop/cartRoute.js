import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCart,
  getCartItems,
  updateCartItemQty,
} from "../../controllers/shop/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;

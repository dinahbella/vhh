import express from "express";
import {
  login,
  registerUser,
} from "../../controllers/authControllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;

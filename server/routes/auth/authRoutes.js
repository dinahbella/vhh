import express from "express";
import {
  authMiddleware,
  login,
  logout,
  registerUser,
} from "../../controllers/authControllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is Authenticated",
    user,
  });
});

export default router;

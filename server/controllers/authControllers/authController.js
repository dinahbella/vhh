//  register
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    // Check for missing fields first
    if (!userName || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// login
export const login = async (res, req) => {
  try {
  } catch (error) {
    res.staus(500).json({ success: false, message: "Internal server error" });
  }
};
// logout

// middleware

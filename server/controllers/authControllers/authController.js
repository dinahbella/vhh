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
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User dosen't exists! Please register first",
      });
    const isPasswordMatch = await bcrypt.compare(password, isPasswordMatch);
    if (!isPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password, Please try again",
      });
    const token = jwt.sign({
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
    });
  } catch (error) {
    res.staus(500).json({ success: false, message: "Internal server error" });
  }
};
// logout

// middleware

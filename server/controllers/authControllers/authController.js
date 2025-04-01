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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password, Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "SECRET_KEY",
      { expiresIn: "7d" } // Corrected token expiration format
    );

    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// logout
export const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Looged out successfully",
  });
};
// middleware

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

import { ImageUpload } from "../../helper/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export const handleImageUpload = async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file was uploaded",
      });
    }

    // 2. Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, and WEBP images are allowed",
      });
    }

    // 3. Process the file (fixed typo from req.fole to req.file)
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // 4. Upload to Cloudinary
    const result = await ImageUpload(dataURI);

    // 5. Return response
    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};

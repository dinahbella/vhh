import { ImageUpload } from "../../helper/cloudinary.js";

export const handleImageUpload = async (req, res) => {
  try {
    // 1. Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 2. Validate file type
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed",
      });
    }

    // 3. Process the file
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // 4. Upload to Cloudinary
    const result = await ImageUpload(dataURI);

    // 5. Return success response
    return res.status(200).json({
      success: true,
      url: result.secure_url, // Assuming Cloudinary returns secure_url
      public_id: result.public_id, // Useful for future management
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};

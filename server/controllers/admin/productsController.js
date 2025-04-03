import { ImageUpload } from "../../helper/cloudinary.js";
import dotenv from "dotenv";
import Product from "../../models/Product.js";
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

//  add new product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const createProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await createProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Added successfully",
      data: createProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// get all product
export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All products fetche successfully",
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// edit a product

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Check if the product exists
    const getProduct = await Product.findById(id);
    if (!getProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product details
    getProduct.title = title || getProduct.title;
    getProduct.description = description || getProduct.description;
    getProduct.category = category || getProduct.category;
    getProduct.brand = brand || getProduct.brand;
    getProduct.price = price || getProduct.price;
    getProduct.salePrice = salePrice || getProduct.salePrice;
    getProduct.totalStock = totalStock || getProduct.totalStock;
    getProduct.image = image || getProduct.image;

    await getProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: getProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete a producc
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

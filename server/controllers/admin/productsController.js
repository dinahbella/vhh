import { ImageUpload } from "../../helper/cloudinary.js";
import dotenv from "dotenv";
import Product from "../../models/Product.js";
dotenv.config();

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
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
      message: "All products fetched successfully",
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
    const getProduct = await Product.findByIdAndUpdate(id);
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

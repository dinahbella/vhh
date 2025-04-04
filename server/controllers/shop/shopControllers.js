import Product from "../../models/Product.js";
export const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Filtered products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const validateItems = cart.items.filter((item) => item.productId);
    if (validateItems.length < cart.items.length) {
      cart.items = validateItems;
      await cart.save();
    }
    const populateCartItems = validateItems.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
export const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      message: "Item quantity updated successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate inputs
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    // Find the cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out the deleted item
    cart.items = cart.items.filter(
      (item) => item.productId && item.productId.toString() !== productId
    );

    // Save updated cart
    await cart.save();

    // Populate again to ensure product details are included
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    // Format response data
    const updatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || "Product not found",
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Item deleted from cart successfully",
      data: updatedCartItems, // Only returning items, not the full cart
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the item",
    });
  }
};

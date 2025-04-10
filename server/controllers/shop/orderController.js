// routes/orderController.js
import axios from "axios";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Create Order & Initiate Paystack Payment
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      email,
    } = req.body;

    const orderTotalInKobo = totalAmount * 100;

    // Step 1: Initialize Paystack transaction
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: orderTotalInKobo,
        callback_url: "http://localhost:3000/shop/paystack-return",
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = paystackResponse;

    if (!data.status) {
      return res.status(400).json({
        success: false,
        message: "Failed to initiate Paystack payment",
      });
    }

    // Step 2: Save order before payment confirmation
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod: "paystack",
      paymentStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      orderId: newOrder._id,
      authorization_url: data.data.authorization_url,
    });
  } catch (e) {
    console.log(e.response?.data || e.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing payment",
    });
  }
};

// Capture Payment (Verify via Paystack)
export const capturePayment = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    const paystackVerify = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = paystackVerify.data;

    if (verifyData.status && verifyData.data.status === "success") {
      let order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      order.paymentMethod = "paystack";
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = verifyData.data.id;
      order.payerId = verifyData.data.customer.id;

      for (let item of order.cartItems) {
        let product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.title}`,
          });
        }
        product.totalStock -= item.quantity;
        await product.save();
      }

      await Cart.findByIdAndDelete(order.cartId);
      await order.save();

      return res.status(200).json({
        success: true,
        message: "Payment confirmed and order updated",
        data: order,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (e) {
    console.log(e.response?.data || e.message);
    return res.status(500).json({
      success: false,
      message: "Error capturing Paystack payment",
    });
  }
};

// Get All Orders by User
export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get Order Details
export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

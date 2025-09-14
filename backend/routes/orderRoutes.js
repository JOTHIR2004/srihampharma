// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// Place order
router.post("/create", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId, productId, quantity);
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      productId,
      quantity,
      status: "pending",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all orders (Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username")
      .populate("productId", "name");

    const formattedOrders = orders.map(order => ({
      id: order._id,
      userName: order.userId?.username,
      productName: order.productId?.name,
      quantity: order.quantity,
      status: order.status,
    }));

    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get orders for a user
router.get("/user/:id", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
      .populate("productId", "name price");
    
    console.log(orders);

    res.json(orders);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// Place order
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({ message: "Product not found" });

    const totalPrice = product.price * quantity;
    const order = await Order.create({ product: product._id, customer: req.user.id, quantity, totalPrice });
    res.status(201).json(order);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (for customer)
router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).populate("product","name price");
  res.json(orders);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// Add product (only shop owners)
router.post("/", authMiddleware, async (req, res) => {
//   if(req.user.role !== "shop-owner") return res.status(403).json({ message: "Forbidden" });

  const { name, description, price } = req.body;
  try {
    const product = await Product.create({ name, description, price, owner: req.user.id });
    res.status(201).json(product);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find().populate("owner","name email");
  res.json(products);
});

module.exports = router;

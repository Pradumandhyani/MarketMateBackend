const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ADD PRODUCT WITH IMAGE
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price } = req.body;

      const product = await Product.create({
        name,
        description,
        price,
        image: req.file ? `/uploads/products/${req.file.filename}` : null,
        owner: req.user.id
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find().populate("owner", "name email");
  res.json(products);
});

module.exports = router;

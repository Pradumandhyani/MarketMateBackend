
const Product = require("../models/Product.js");
const upload =require("../middleware/upload.js");
const auth = require("../middleware/authMiddleware.js");
const express = require("express");

const router = express.Router();

// add product
router.post(
  "/",
  auth,
  upload.array("images", 5), // 👈 max 5 images
  async (req, res) => {
    try {
      const imagePaths = req.files.map(file => file.path);

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: imagePaths,
        user: req.user.id
      });

      await product.save();
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// get products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports= router;

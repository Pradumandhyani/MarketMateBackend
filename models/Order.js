const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending","completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

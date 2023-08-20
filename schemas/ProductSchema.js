const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  imageUrl: String,
});

const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;

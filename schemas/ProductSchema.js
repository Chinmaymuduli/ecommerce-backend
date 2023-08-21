const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: {
    type: String,
    ref: "category",
  },
  imageUrl: String,
  size: String,
  _id: String,
});

const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;

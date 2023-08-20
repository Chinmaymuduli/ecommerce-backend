const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;

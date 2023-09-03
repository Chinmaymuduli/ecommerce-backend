const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  userId: mongoose.Schema.Types.ObjectId,
  count: Number,
});
const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;

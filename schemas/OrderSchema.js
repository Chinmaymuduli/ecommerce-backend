const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
});
const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;

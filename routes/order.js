const express = require("express");
const OrderModel = require("../controller/orderController");

const router = express.Router();

router.get("/summary", OrderModel.getOrder);

module.exports = router;

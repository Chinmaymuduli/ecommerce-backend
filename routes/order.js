const express = require("express");
const OrderModel = require("../controller/orderController");

const router = express.Router();

router.get("/summary", OrderModel.getOrder);
router.post("/create", OrderModel.createOrder);
router.get("/", OrderModel.getConfirmOrder);
router.get("/:id", OrderModel.getConfirmOrderById);

module.exports = router;

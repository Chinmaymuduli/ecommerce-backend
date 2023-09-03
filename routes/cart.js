const express = require("express");
const CartController = require("../controller/cartController");

const router = express.Router();
// category
router.post("/:id", CartController.createCarts);
router.get("/", CartController.getCarts);
router.put("/update", CartController.updateCarts);

module.exports = router;

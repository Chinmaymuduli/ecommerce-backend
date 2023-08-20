const express = require("express");
const ProductController = require("../controller/productController");

const router = express.Router();

router.post("/create", ProductController.createProducts);
router.get("/", ProductController.getProducts);
router.put("/:id", ProductController.updateProducts);
router.delete("/:id", ProductController.deleteProducts);

module.exports = router;

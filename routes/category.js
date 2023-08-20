const express = require("express");
const ProductController = require("../controller/categoryController");

const router = express.Router();
// category
router.post("/create", ProductController.createCategory);

module.exports = router;

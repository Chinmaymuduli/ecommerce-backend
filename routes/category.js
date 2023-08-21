const express = require("express");
const ProductController = require("../controller/categoryController");

const router = express.Router();
// category
router.post("/create", ProductController.createCategory);
router.get("/", ProductController.getAllCategory);
router.put("/:id", ProductController.updateCategory);
router.delete("/:id", ProductController.deleteCategory);

module.exports = router;

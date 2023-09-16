const express = require("express");
const AddressController = require("../controller/AddressController");

const router = express.Router();
// category
router.post("/create", AddressController.createAddress);
router.get("/", AddressController.getAddress);

module.exports = router;

const express = require("express");
const registerController = require("../controller/registerController");

const router = express.Router();

router.post("/", registerController);

module.exports = router;

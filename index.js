const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("db connected");
});

app.listen(8000, () => {
  console.log(`app running at 8000`);
});

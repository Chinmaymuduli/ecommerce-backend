const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("db connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

app.listen(8000, () => {
  console.log(`app running at 8000`);
});

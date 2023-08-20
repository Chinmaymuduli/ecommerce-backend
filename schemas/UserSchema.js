const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  mobileNumber: String,
  gender: String,
  token: String,
  photoUrl: String,
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

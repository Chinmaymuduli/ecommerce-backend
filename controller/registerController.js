const UserModel = require("../schemas/UserSchema");

const registerController = async (req, res) => {
  let { email, password, name, mobileNumber } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({
      data: undefined,
      message: "please fill all required field",
    });
  }
  let newUser = new UserModel({
    name,
    email,
    password,
    mobileNumber,
  });

  let userSaved = await newUser.save();
  if (!userSaved) {
    return res.status(400).json({
      data: undefined,
      message: "User creation failed",
    });
  }
  return res.status(200).json({
    data: userSaved,
    message: "User created successfully",
  });
};
module.exports = registerController;

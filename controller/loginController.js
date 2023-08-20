const UserModel = require("../schemas/UserSchema");
var jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      data: undefined,
      message: "please fill all required field",
    });
  }

  let loginUser = await UserModel.findOne({ email: email, password: password });
  var token = jwt.sign(
    { email: email, _id: loginUser?._id },
    process.env.TOKEN_SECRETE
  );
  if (!loginUser) {
    return res.status(400).json({
      data: undefined,
      message: "User login failed",
    });
  }
  return res.status(200).json({
    data: {
      token,
      user: {
        _id: loginUser?._id,
        name: loginUser?.name,
        email: loginUser?.email,
      },
    },
    message: "User logged in successfully",
  });
};
module.exports = loginController;

const AddressModel = require("../schemas/AddressSchema");

exports.createAddress = async (req, res) => {
  try {
    const { street, city, postalCode, state, country } = req.body;
    const addressData = { street, city, postalCode, state, country };
    const savedAddress = new AddressModel(addressData);
    await savedAddress.save();
    return res.status(200).json({
      data: savedAddress,
      message: "Address created successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error?.message,
      status: 400,
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const address = await AddressModel.find().exec();
    if (address) {
      return res.status(200).json({
        data: address,
        message: "Address get successfully",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error?.message,
      status: 400,
    });
  }
};

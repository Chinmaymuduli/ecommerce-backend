const { Types } = require("mongoose");
const CartModel = require("../schemas/CartSchema");
const OrderModel = require("../schemas/OrderSchema");
const ProductModel = require("../schemas/ProductSchema");

exports.getOrder = async (req, res) => {
  try {
    const { type, productId, count } = req.query;
    console.log(count);
    let orderResponse;
    if (type === "cart") {
      orderResponse = await CartModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            userId: new Types.ObjectId(req?.user?._id),
          },
        },
        {
          $unwind: "$product",
        },
        {
          $project: {
            productId: 0,
            userId: 0,
          },
        },
      ]);
    }
    if (type === "product") {
      const product = await ProductModel.findById({ _id: productId }).exec();
      orderResponse = new Array(count).fill({ product, count });
    }

    if (orderResponse) {
      return res.status(200).json({
        data: orderResponse,
        message: "Order get successfully",
        status: 200,
      });
    }
    return res.status(400).json({
      data: undefined,
      message: "Order get failed",
      status: 400,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
      status: 400,
    });
  }
};

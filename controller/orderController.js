const { Types } = require("mongoose");
const CartModel = require("../schemas/CartSchema");
const ProductModel = require("../schemas/ProductSchema");
const OrderModel = require("../schemas/OrderSchema");

exports.getOrder = async (req, res) => {
  try {
    const { type, productId, count } = req.query;
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

      orderResponse = orderResponse.map((item) => ({
        ...item,
        totalPrice: item.product.price * item.count,
      }));

      const finalTotalPrice = orderResponse.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      orderResponse = {
        orderItems: orderResponse,
        finalTotalPrice: finalTotalPrice,
      };
    }
    if (type === "product") {
      const product = await ProductModel.findById({ _id: productId }).exec();
      const totalPrice = product.price * count;
      orderResponse = {
        orderItems: [{ product, count, totalPrice }],
        finalTotalPrice: totalPrice,
      };
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

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, finalTotalPrice, address } = req.body;
    // Create a new order instance.
    const order = new OrderModel({
      user: req.user._id,
      orderItems,
      totalAmount: finalTotalPrice,
      address,
    });

    await order.save();

    return res.status(200).json({
      data: order,
      message: "Order created successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
      status: 400,
    });
  }
};

exports.getConfirmOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await OrderModel.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "orderItems.product",
        },
      },
      {
        $unwind: "$orderItems.product",
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $unwind: "$address",
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          address: { $first: "$address" },
          totalAmount: { $first: "$totalAmount" },
          orderItems: { $push: "$orderItems" },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
    ]);

    return res.status(200).json({
      data: response,
      message: "Confirmed orders retrieved successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
      status: 400,
    });
  }
};
exports.getConfirmOrderById = async (req, res) => {
  try {
    const orderId = req?.params;
    const response = await OrderModel.findById({
      _id: new Types.ObjectId(orderId?.id),
    });

    return res.status(200).json({
      data: response,
      message: "Confirmed orders get successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
      status: 400,
    });
  }
};

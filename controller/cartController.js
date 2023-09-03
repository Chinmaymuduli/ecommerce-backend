const { Types } = require("mongoose");
const CartModel = require("../schemas/CartSchema");
const ProductModel = require("../schemas/ProductSchema");

exports.getCarts = async (req, res) => {
  try {
    const getAllCart = await CartModel.find({
      userId: new Types.ObjectId(req.user?._id),
    }).populate("productId");
    if (getAllCart) {
      const formattedData = getAllCart.map((cartItem) => ({
        product: cartItem.productId,
        count: cartItem.count || 0,
        _id: cartItem?._id,
      }));
      return res.status(200).json({
        data: formattedData,
        message: "Cart get successfully",
        status: 200,
      });
    }
    return res.status(400).json({
      data: undefined,
      message: "Cart fetch failed",
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

exports.createCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const getCart = await CartModel.findOne({
      productId: id,
      userId: new Types.ObjectId(req.user?._id),
    });
    if (getCart) throw new Error("Product already added in cart");
    const newCart = new CartModel({
      userId: new Types.ObjectId(req.user?._id),
      productId: id,
      count: 1,
    });

    let cartSaved = await newCart.save();

    const productResponse = await CartModel.find().populate("productId");

    if (!cartSaved) {
      return res.status(400).json({
        data: undefined,
        message: "Cart create failed",
      });
    }
    return res.status(200).json({
      data: productResponse,
      message: "Cart created successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
    });
  }
};

exports.updateCarts = async (req, res) => {
  try {
    const { cartId, isIncrement, isDecrement } = req.body;
    const userId = new Types.ObjectId(req.user?._id);

    let updateCart;

    if (isIncrement) {
      updateCart = await CartModel.findByIdAndUpdate(
        { _id: cartId, userId: userId },
        { $inc: { count: 1 } },
        { new: true }
      );
    } else if (isDecrement) {
      updateCart = await CartModel.findByIdAndUpdate(
        { _id: cartId, userId: userId },
        { $inc: { count: -1 } },
        { new: true }
      );

      if (updateCart && updateCart.count === 0) {
        await CartModel.findByIdAndRemove(cartId);
        return res.status(200).json({
          data: null,
          message: "Item removed from cart",
          status: 200,
        });
      }
    } else {
      return res.status(400).json({
        data: undefined,
        message: "Invalid request",
      });
    }

    if (!updateCart) {
      return res.status(400).json({
        data: undefined,
        message: "Cart update failed",
      });
    }
    return res.status(200).json({
      data: updateCart,
      message: "Cart updated successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      data: undefined,
      message: error.message,
    });
  }
};

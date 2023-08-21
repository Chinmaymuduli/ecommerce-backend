const { imageUpload } = require("../hooks/imageUpload");
const CategoryModel = require("../schemas/CategorySchema");
const ProductModel = require("../schemas/ProductSchema");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.createProducts = async (req, res) => {
  let {
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    size,
    imageUrl,
  } = req.body;

  try {
    const resImg = await cloudinary.uploader
      .upload(req?.files?.imageUrl?.tempFilePath)
      .then((data) => {
        return data;
      });

    const newProduct = new ProductModel({
      title,
      description,
      price,
      stock,
      brand,
      category,
      size,
      imageUrl: resImg?.url,
    });

    let productSaved = await newProduct.save();
    // for delete tmp folder image file structure while upload image
    fs.unlink(req?.files?.imageUrl?.tempFilePath, () => {});
    fs.rm(req?.files?.imageUrl?.tempFilePath, () => {});

    if (!productSaved) {
      return res.status(400).json({
        data: undefined,
        message: "Product create failed",
      });
    }
    return res.status(200).json({
      data: productSaved,
      message: "Product created successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getProducts = async (req, res) => {
  try {
    let dynamicQuery = {};
    if (req.query?.productId) dynamicQuery._id = req.query?.productId;
    if (req.query?.categoryId) dynamicQuery.category = req.query?.categoryId;
    if (req.query?.search)
      dynamicQuery.title = new RegExp(req.query?.search, "i");

    let allProducts;
    allProducts = await ProductModel.find(dynamicQuery)
      .populate("category")
      .exec();
    if (!allProducts) {
      return res.status(400).json({
        data: undefined,
        status: 400,
        message: "Products fetch failed",
      });
    }
    return res.status(200).json({
      data: req.query.productId ? allProducts[0] : allProducts,
      message: "Product get successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.updateProducts = async (req, res) => {
  try {
    let { title, description, price, stock, brand, category, size, imageUrl } =
      req.body;
    let { id } = req.params;
    if (!id) {
      return res.status(404).json({
        data: undefined,
        message: "please provide product id",
      });
    }
    const resImg = await cloudinary.uploader
      .upload(req?.files?.imageUrl?.tempFilePath)
      .then((data) => {
        return data;
      });
    // for delete tmp folder image file structure while upload image
    fs.unlink(req?.files?.imageUrl?.tempFilePath, () => {});
    fs.rm(req?.files?.imageUrl?.tempFilePath, () => {});

    const updateProducts = await ProductModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      stock,
      brand,
      category,
      size,
      imageUrl: resImg?.url,
    });
    if (!updateProducts) {
      return res.status(400).json({
        status: 400,
        message: "Product update failed",
      });
    }
    return res.status(200).json({
      data: updateProducts,
      status: 200,
      message: "Product update successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteProducts = async (req, res) => {
  try {
    let { id } = req.params;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(400).json({
        data: undefined,
        status: 400,
        message: "product deleted unsuccessfully",
      });
    }
    return res.status(200).json({
      data: id,
      status: 200,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// get similar products

exports.getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    // const allProducts = await ProductModel.find();
    const allProducts = await ProductModel.aggregate([
      {
        $match: {
          _id: { $toObjectId: id },
        },
      },
    ]);
    console.log({ allProducts });
    if (!allProducts) {
      return res.status(400).json({
        data: undefined,
        status: 400,
        message: "Products fetch failed",
      });
    }
    return res.status(200).json({
      data: allProducts,
      message: "Product get successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

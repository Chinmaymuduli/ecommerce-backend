const { imageUpload } = require("../hooks/imageUpload");
const CategoryModel = require("../schemas/CategorySchema");
const fs = require("fs");

exports.createCategory = async (req, res) => {
  let { title, description, imageUrl } = req.body;

  try {
    // const resImg = imageUpload(req?.files?.imageUrl?.tempFilePath);
    // console.log(resImg);
    const newCategory = new CategoryModel({
      title,
      description,

      //   imageUrl: resImg?.url,
    });

    let categorySaved = await newCategory.save();
    // for delete tmp folder image file structure while upload image
    // fs.unlink(req?.files?.imageUrl?.tempFilePath, () => {});
    // fs.rm(req?.files?.imageUrl?.tempFilePath, () => {});

    if (!categorySaved) {
      return res.status(400).json({
        data: undefined,
        message: "Product create failed",
      });
    }
    return res.status(200).json({
      data: categorySaved,
      message: "Product created successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await CategoryModel.find();
    if (!allCategory) {
      return res.status(400).json({
        data: undefined,
        status: 400,
        message: "Category fetch failed",
      });
    }
    return res.status(200).json({
      data: allCategory,
      message: "Category get successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let { title, description } = req.body;
    let { id } = req.params;
    if (!id) {
      return res.status(404).json({
        data: undefined,
        message: "please provide product id",
      });
    }

    const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (!updateCategory) {
      return res.status(400).json({
        status: 400,
        message: "Category update failed",
      });
    }
    return res.status(200).json({
      data: updateCategory,
      status: 200,
      message: "Category update successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(400).json({
        data: undefined,
        status: 400,
        message: "Category deleted unsuccessfully",
      });
    }
    return res.status(200).json({
      data: id,
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

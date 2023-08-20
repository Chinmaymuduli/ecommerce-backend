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

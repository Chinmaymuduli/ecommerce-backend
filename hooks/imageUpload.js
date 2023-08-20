const cloudinary = require("cloudinary").v2;
const imageUpload = async (tempFilePath) => {
  try {
    const resData = await cloudinary.uploader
      .upload(tempFilePath)
      .then((data) => {
        return data;
      });
    return resData;
  } catch (error) {
    console.log(error);
  }
};

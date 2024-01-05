import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload on cloudinary
    const response = cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully !!
    console.log("File uploaded ", response.url);
    return response;
  } catch (error) {
    //remove the locally saved temperary file as the upload operation failed
    fs.unlinkSync(localFilePath); //unLinkSync: not sync: ye kaam to karna he hai
    return null;
  }
};

export { uploadOnCloudinary };

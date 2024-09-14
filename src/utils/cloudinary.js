import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });
})();

// function to upload to cloudinary
const uploadToCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) {
      return null;
    }
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    // file has been uploaded
    console.log("uploaded ✅", response.url);
    return response;
  } catch (error) {
    // remove the locally saved temperary file
    // if the upload fails
    fs.unlinkSync(localfilePath);
  }
};

export { uploadToCloudinary };

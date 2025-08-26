import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      folder: "class-notes", // ✅ better than "public"
      resource_type: "auto", // supports images, pdf, docs, etc.
    });

    // Remove temp file (important on Vercel)
    await fs.promises.unlink(localFilePath);

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Cleanup if failed
    try {
      await fs.promises.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }

    return null;
  }
};

export { uploadOnCloudinary };

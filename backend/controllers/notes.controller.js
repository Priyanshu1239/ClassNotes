import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Notes } from "../models/notes.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // assuming this exists
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



const uploadNotes = asyncHandler(async (req, res) => {
  const {
      university,
      course,
      branch,
      subject,
      topic,
      description
  } = req.body;

  // Check required fields
  if (!university || !course || !branch || !subject || !topic || !description) {
      throw new apiError(400, "Please fill all the fields");
  }

  // Get user information from authentication
  const user = req.user;
  if (!user) {
      throw new apiError(401, "User not authenticated");
  }

  // File handling
 const fileLocalPath = req.files?.file?.[0]?.path;
  if (!fileLocalPath) {
      throw new apiError(400, "File is required");
  }

  const File = await uploadOnCloudinary(fileLocalPath);
  if (!File) {
      throw new apiError(400, "File upload failed");
  }

  const notes = new Notes({
      name: user.name || user.username,
      email: user.email,
      university,
      course,
      branch,
      subject,
      topic,
      description,
      file: File.url,
  });

  await notes.save();

  res.status(201).json(
      new apiResponse(201, "Upload successful", notes)
  );
});


const fetchNotes = asyncHandler(async (req, res) => {
    const { topic } = req.body; // or req.query for GET
  
    if (!topic) {
      throw new apiError(400, "Topic is required");
    }
  
    const notes = await Notes.find({
      topic: { $regex: topic, $options: "i" } // case-insensitive partial match
    }).select("topic description file");
  
    if (!notes.length) {
      return res.status(404).json({ message: "No notes found for this topic." });
    }
  
    const response = notes.map(note => ({
      topic: note.topic,
      description: note.description,
      fileUrl: note.file
    }));
  
    res.status(200).json({ notes: response });
  });
  
const getAllNotes = asyncHandler(async (req, res) => {
    let token = req.headers.authorization?.split(" ")[1];
    console.log("TOKEN RECEIVED =>", token);
  
    if (!token) {
      console.log("No token, proceeding public");
      return res.status(200).json({ notes: [] });
    }
  
    try {
      console.log("ACCESS_TOKEN_SECRET =>", process.env.ACCESS_TOKEN_SECRET);
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("DECODED =>", decoded);
  
      const user = await User.findById(decoded._id).select("email");
      if (!user) throw new Error("User not found from token");
  
      const notes = await Notes.find({ email: user.email });
      return res.status(200).json({ notes });
    } catch (err) {
      console.log("Invalid token but proceeding public", err.message);
      return res.status(200).json({ notes: [] });
    }
  });
  


  
  

export { 
    uploadNotes,
    fetchNotes,
    getAllNotes
}

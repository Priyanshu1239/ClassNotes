import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // Import User model

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized: No token provided");
    }

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    if (!tokenSecret) {
      throw new apiError(500, "JWT secret not configured");
    }

    // Verify token
    const decodedToken = jwt.verify(token, tokenSecret);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new apiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // ✅ Tell frontend clearly
      return res.status(401).json(new apiError(401, "Access token expired"));
    }
    return res.status(401).json(new apiError(401, "Invalid or missing access token"));
  }
});

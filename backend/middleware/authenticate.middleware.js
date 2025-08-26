import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyTokenOptional = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);

      const user = await User.findById(decoded._id).select("-password -refreshToken");
      req.user = user || null;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.log("⚠️ Token expired, proceeding as public request");
      } else {
        console.log("⚠️ Invalid token, proceeding as public request");
      }
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
});

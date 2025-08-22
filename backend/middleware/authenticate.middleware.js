import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyTokenOptional = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // fetch user from DB
      const user = await User.findById(decoded._id).select("-password -refreshToken");
      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
    } catch (err) {
      console.log("Invalid token but proceeding public");
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
});

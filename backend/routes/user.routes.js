import express from "express";
import { contactUser, registerUser, loginUser, refreshAccessToken } from "../controllers/user.controller.js";
import { uploadNotes, fetchNotes, getAllNotes } from "../controllers/notes.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyTokenOptional } from "../middleware/authenticate.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/contact", contactUser);

// Notes routes
router.post(
  "/upload",
  verifyJWT,
  upload.fields([{ name: "file", maxCount: 1 }]),
  uploadNotes
);
router.get("/notes", verifyTokenOptional, getAllNotes);
router.post("/search", fetchNotes);

export default router;

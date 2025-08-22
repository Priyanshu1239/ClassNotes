import express from "express";
import { contactUser, registerUser } from "../controllers/user.controller.js";
import {loginUser} from '../controllers/user.controller.js';
import { uploadNotes } from "../controllers/notes.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { fetchNotes } from "../controllers/notes.controller.js";
import {  verifyTokenOptional } from "../middleware/authenticate.middleware.js";
import { getAllNotes } from "../controllers/notes.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post(
    "/upload", 
    verifyJWT,
    upload.fields([{ name: "file", maxCount: 1 }]),
    uploadNotes
  );

router.post("/search", fetchNotes);
router.get("/notes", verifyTokenOptional, getAllNotes);
router.post("/contact",contactUser);





export default router;
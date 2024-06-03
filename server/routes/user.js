import express from "express";
import { getMyProfile, login, register } from "../controllers/user.js";
import { singelAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", singelAvatar,register );
router.post("/login", login);

// after this all request check weather user is login or not 

router.get("/me", isAuthenticated,getMyProfile)

export default router;

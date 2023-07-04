import express from "express";

//Controllers
import {
	register,
	authentication,
	confirm,
	forgotPassword,
	checkToken,
	newPassword,
	profile
} from "../controllers/userController.js";

//Middlewares
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

//Auth, Register and Confirm User
router.post("/register", register);
router.post("/login", authentication);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", checkToken);
router.post("/forgot-password/:token", newPassword);
router.get("/profile", checkAuth, profile)

export default router;

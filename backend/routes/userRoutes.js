import express from "express";

//Controllers
import { register } from "../controllers/userController.js";

const router = express.Router();


//Auth, Register and Confirm User
router.post('/', register);

export default router
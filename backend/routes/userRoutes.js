import express from "express";

//Controllers
import { register, authentication } from "../controllers/userController.js";

const router = express.Router();


//Auth, Register and Confirm User
router.post('/register', register);
router.post('/login', authentication);

export default router
import express from "express";

//Controllers
import { register, authentication, confirm } from "../controllers/userController.js";

const router = express.Router();


//Auth, Register and Confirm User
router.post('/register', register);
router.post('/login', authentication);
router.get('/confirm/:token', confirm);

export default router
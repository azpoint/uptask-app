
import express from "express"

import {
	addTask,
	getTask,
	updateTask,
	deleteTask,
	chageTaskState
} from "../controllers/taskController.js"

import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post('/', checkAuth, addTask);
router.get('/:id', checkAuth, getTask);
router.put('/:id', checkAuth, updateTask);
router.delete('/:id', checkAuth, deleteTask);

router.post('/state/:id', checkAuth, chageTaskState);

export default router
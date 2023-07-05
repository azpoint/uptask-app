import express from "express";

import {
	getProjects,
	newProject,
	getProject,
	editProject,
	deleteProject,
	addColl,
	deleteColl,
	getTasks,
} from "../controllers/projectController.js";

import checkAuth from "../middlewares/checkAuth.js"

const router = express.Router();

router.get('/', checkAuth, getProjects);
router.post('/', checkAuth, newProject);

router.get('/:id', checkAuth, getProject);
router.put('/:id', checkAuth, editProject);
router.delete('/:id', checkAuth, deleteProject);

router.post('/add-coll/:id', checkAuth, addColl);
router.post('/delete-coll/:id', checkAuth, deleteColl)
router.get('/task/:id', checkAuth, getTasks);

export default router;
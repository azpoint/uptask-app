import express from "express";

import {
	getProjects,
	newProject,
	getProject,
	editProject,
	deleteProject,
	addCollaborators,
	deleteCollaborators,
	getTasks,
	searchCollaborator,
} from "../controllers/projectController.js";

import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getProjects);
router.post("/", checkAuth, newProject);

router.get("/:id", checkAuth, getProject);
router.put("/:id", checkAuth, editProject);
router.delete("/:id", checkAuth, deleteProject);

router.get("/task/:id", checkAuth, getTasks);

router.post("/collaborators", checkAuth, searchCollaborator);
router.post("/collaborators/:id", checkAuth, addCollaborators);
router.post("/delete-collaborator/:id", checkAuth, deleteCollaborators);

export default router;

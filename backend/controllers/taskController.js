import mongoose from "mongoose";
import Project from "../db/models/Project.js";
import Task from "../db/models/Task.js"

const addTask = async (req, res) => {
	const { project } = req.body;

	try {
		const projectInDB = await Project.findById(project);

		if(projectInDB.creator.toString() !== req.user._id.toString()) {
			const errorMsg = new Error("You have no access to this project");
			return res.status(404).json({ msg: errorMsg.message });
		}

		const taskInDB = await Task.create(req.body);
		projectInDB.tasks.push(taskInDB._id)
		await projectInDB.save();
		res.json(taskInDB)
	} catch (error) {
		const errorMsg = new Error("Project not available");
		return res.status(404).json({ msg: errorMsg.message })
	}
};

const getTask = async (req, res) => {
	const { id } = req.params
	console.log("Is this the task id?", id)

	try {
		const task = await Task.findById(id).populate("project");

		if(task.project.creator.toString() !== req.user._id.toString()) {
			const errorMsg = new Error("You have no access to this project");
			return res.status(403).json({ msg: errorMsg.message });
		}

		if(!task) {
			const errorMsg = new Error("Project not available");
			return res.status(404).json({ msg: errorMsg.message });
		}
		
		res.json(task)
	} catch (error) {
		const errorMsg = new Error("Project not available");
		return res.status(404).json({ msg: errorMsg.message });
	}
};

const updateTask = async (req, res) => {
	const { id } = req.params

	try {
		const task = await Task.findById(id).populate("project");

		if(task.project.creator.toString() !== req.user._id.toString()) {
			const errorMsg = new Error("You have no access to this project");
			return res.status(403).json({ msg: errorMsg.message });
		}

		if(!task) {
			const errorMsg = new Error("Project not available");
			return res.status(404).json({ msg: errorMsg.message });
		}
		
		task.name = req.body.name || task.name;
		task.description = req.body.description || task.description;
		task.priority = req.body.priority || task.priority;
		task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

		const taskInDB = await task.save()
		res.json(taskInDB)
	} catch (error) {
		const errorMsg = new Error("Project not available");
		return res.status(404).json({ msg: errorMsg.message });
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params

	try {
		const task = await Task.findById(id).populate("project");

		if(task.project.creator.toString() !== req.user._id.toString()) {
			const errorMsg = new Error("You have no access to this project");
			return res.status(403).json({ msg: errorMsg.message });
		}

		if(!task) {
			const errorMsg = new Error("Project not available");
			return res.status(404).json({ msg: errorMsg.message });
		}		

		await task.deleteOne()
		res.json({msg: "Task Deleted"})
	} catch (error) {
		const errorMsg = new Error("Project not available");
		return res.status(404).json({ msg: errorMsg.message });
	}
};

const chageTaskState = async (req, res) => {};

export {
	addTask,
	getTask,
	updateTask,
	deleteTask,
	chageTaskState
}
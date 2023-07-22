import Project from "../db/models/Project.js";
import Task from "../db/models/Task.js";

const getProjects = async (req, res) => {
	const projects = await Project.find().where('creator').equals(req.user);

	res.json(projects)
};

const newProject = async (req, res) => {
	const project = new Project(req.body);

	project.creator = req.user._id;

	try {
		const projectDB = await project.save()
		res.json(projectDB);
	} catch (error) {
		console.log(error);
	}
};

const getProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Project.findById(id);

		if(!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({msg: error.message})
		}
		if(project.creator.toString() !== req.user._id.toString()) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({msg: error.message})
		}

		// const tasks = await Task.find().where("project").equals(project._id);
		

		res.json(project)
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({msg: error2.message})
	}
};

const editProject = async (req, res) => {
	const { id } = req.params;
	

	try {
		const project = await Project.findById(id);

		if(!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({msg: error.message})
		}
		if(project.creator.toString() !== req.user._id.toString()) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({msg: error.message})
		}
		
		project.name = req.body.name || project.name;
		project.description = req.body.description || project.description;
		project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
		project.client = req.body.client || project.client;

		const savedProject = await project.save()

		return res.json(savedProject)
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({msg: error2.message})
	}
};

const deleteProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Project.findById(id);

		if(!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({msg: error.message})
		}
		if(project.creator.toString() !== req.user._id.toString()) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({msg: error.message})
		}
		await project.deleteOne();
		res.json({msg: "Project Deleted"})
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({msg: error2.message})
	}
};

const addColl = async (req, res) => {};

const deleteColl = async (req, res) => {};

const getTasks = async (req, res) => {
	const {id } = req.params;

	try {
		const isAProject = await Project.findById(id)

		if(!isAProject) {
			const error = new Error("Project not Found");
			return res.status(404).json({msg: error.message});
		}

		const tasks = await Task.find().where("project").equals(id);
		res.json(tasks)
	} catch (error) {
		
	}
};

export {
	getProjects,
	newProject,
	getProject,
	editProject,
	deleteProject,
	addColl,
	deleteColl,
	getTasks,
};

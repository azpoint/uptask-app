import Project from "../db/models/Project.js";
import Task from "../db/models/Task.js";
import User from "../db/models/User.js";

const getProjects = async (req, res) => {
	const projects = await Project.find({
		$or: [{ coll: { $in: req.user } }, { creator: { $in: req.user } }],
	}).select("-tasks");
	res.json(projects);
};

const newProject = async (req, res) => {
	const project = new Project(req.body);

	project.creator = req.user._id;

	try {
		const projectDB = await project.save();
		res.json(projectDB);
	} catch (error) {
		console.log(error);
	}
};

const getProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Project.findById(id)
		//Deep populate field in the query
			.populate({ path: "tasks", populate: { path: "completed", select: "name"} })
			.populate("coll", "name email");

		if (!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({ msg: error.message });
		}
		if (
			project.creator.toString() !== req.user._id.toString() &&
			!project.coll.some(
				(collab) => collab._id.toString() === req.user._id.toString()
			)
		) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({ msg: error.message });
		}

		res.json(project);
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({ msg: error2.message });
	}
};

const editProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Project.findById(id);

		if (!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({ msg: error.message });
		}
		if (project.creator.toString() !== req.user._id.toString()) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({ msg: error.message });
		}

		project.name = req.body.name || project.name;
		project.description = req.body.description || project.description;
		project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
		project.client = req.body.client || project.client;

		const savedProject = await project.save();

		return res.json(savedProject);
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({ msg: error2.message });
	}
};

const deleteProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await Project.findById(id);

		if (!project) {
			const error = new Error("Project not Found");
			return res.status(404).json({ msg: error.message });
		}
		if (project.creator.toString() !== req.user._id.toString()) {
			const error = new Error("You have no access to this project");
			return res.status(401).json({ msg: error.message });
		}
		await project.deleteOne();
		res.json({ msg: "Project Deleted" });
	} catch (error) {
		const error2 = new Error("Project not Found!");
		res.status(404).json({ msg: error2.message });
	}
};

const getTasks = async (req, res) => {
	const { id } = req.params;

	try {
		const isAProject = await Project.findById(id);

		if (!isAProject) {
			const error = new Error("Project not Found");
			return res.status(404).json({ msg: error.message });
		}

		const tasks = await Task.find().where("project").equals(id);
		res.json(tasks);
	} catch (error) {}
};

const searchCollaborator = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email }).select(
		"-confirmed -password -createdAt -updatedAt -token -__v"
	);

	if (!user) {
		const error = new Error("User not found");
		return res.status(404).json({ msg: error.message });
	}

	res.json(user);
};

const addCollaborators = async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		const error = new Error("Project not Found");
		return res.status(404).json({ msg: error.message });
	}

	if (project.creator.toString() !== req.user._id.toString()) {
		const error = new Error("Not valid action");
		return res.status(404).json({ msg: error.message });
	}

	const { email } = req.body;

	const user = await User.findOne({ email }).select(
		"-confirmed -password -createdAt -updatedAt -token -__v"
	);

	if (!user) {
		const error = new Error("User not found");
		return res.status(404).json({ msg: error.message });
	}

	//Collaborator is admin of the proyect

	if (project.creator.toString() === user._id.toString()) {
		const error = new Error("You are the admin of this project!");
		return res.status(404).json({ msg: error.message });
	}

	//Collaborator allready in
	if (project.coll.includes(user._id)) {
		const error = new Error("User allready in this project");
		return res.status(404).json({ msg: error.message });
	}

	//Collaborator is fine
	project.coll.push(user._id);
	await project.save();

	res.json({ msg: "Collaborator succesfully added" });
};

const deleteCollaborators = async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		const error = new Error("Project not Found");
		return res.status(404).json({ msg: error.message });
	}

	if (project.creator.toString() !== req.user._id.toString()) {
		const error = new Error("Not valid action");
		return res.status(404).json({ msg: error.message });
	}

	//Collaborator can be deleted
	project.coll.pull(req.body.id);

	await project.save();

	res.json({ msg: "Collaborator succesfully Deleted" });
};

export {
	getProjects,
	newProject,
	getProject,
	editProject,
	deleteProject,
	addCollaborators,
	deleteCollaborators,
	getTasks,
	searchCollaborator,
};

/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [alert, setAlert] = useState({});
	const [project, setProject] = useState({});
	const [loading, setLoading] = useState(false);
	const [modalFormTask, setModalFormTask] = useState(false);
	const [task, setTask] = useState({});
	const [modalDeleteTask, setModalDeleteTask] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getProjects = async () => {
			try {
				const token = localStorage.getItem("token");

				if (!token) return;

				const config = {
					headers: {
						"Conten-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				};

				const { data } = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/projects`,
					config
				);

				setProjects(data);
			} catch (error) {
				console.log(error);
			}
		};

		getProjects();
	}, []);

	const showAlert = (alert) => {
		setAlert(alert);

		setTimeout(() => {
			setAlert({});
		}, 5000);
	};

	const submitProject = async (project) => {
		if (project.id) {
			await editProject(project);
		} else {
			await newProject(project);
		}
	};

	const editProject = async (project) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/projects/${project.id}`,
				project,
				config
			);

			const updatedProjects = projects.map((projectState) =>
				projectState._id === data._id ? data : projectState
			);

			setProjects(updatedProjects);

			setAlert({
				msg: "Project Updated Successfully",
				error: false,
			});

			setTimeout(() => {
				setAlert({});
				navigate("/projects");
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const newProject = async (project) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/projects`,
				project,
				config
			);

			setProjects([...projects, data]);

			setAlert({
				msg: "Project Created Successfully",
				error: false,
			});

			setTimeout(() => {
				setAlert({});
				navigate("/projects");
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const getProject = async (id) => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`,
				config
			);

			setProject(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const deleteProject = async (id) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.delete(
				`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`,
				config
			);

			//Sync the State
			const updatedProjects = projects.filter(
				(projectState) => projectState._id !== id
			);
			setProjects(updatedProjects);

			setAlert({
				msg: data.msg,
				error: false,
			});

			setTimeout(() => {
				setAlert({});
				navigate("/projects");
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalTask = () => {
		setModalFormTask(!modalFormTask);
		setTask({});
	};

	const submitTask = async (task) => {
		if (task?.id) {
			await editTask(task);
		} else {
			await addTask(task);
		}
	};

	const addTask = async (task) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/task`,
				task,
				config
			);

			//Add task to the state
			const updatedProject = { ...project };

			updatedProject.tasks = [...project.tasks, data];

			setProject(updatedProject);
			setAlert({});
			setModalFormTask(false);
		} catch (error) {
			console.log(error);
		}
	};

	const editTask = async (task) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/task/${task.id}`,
				task,
				config
			);

			const updatedProject = { ...project };
			updatedProject.tasks = updatedProject.tasks.map((taksState) =>
				taksState._id === data._id ? data : taksState
			);

			setProject(updatedProject);

			setAlert({});
			setModalFormTask(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEditTask = (task) => {
		setTask(task);
		setModalFormTask(true);
	};

	const handleModalDeleteTask = (task) => {
		setTask(task);
		setModalDeleteTask(!modalDeleteTask);
	};

	const deleteTask = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) return;

			const config = {
				headers: {
					"Conten-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.delete(
				`${import.meta.env.VITE_BACKEND_URL}/api/task/${task._id}`,
				config
			);

			setAlert({
				msg: data.msg,
				error: false,
			});

			const updatedProject = { ...project };
			updatedProject.tasks = updatedProject.tasks.filter(
				(taskState) => taskState._id !== task._id
			);

			setProject(updatedProject);
			setModalDeleteTask(false);
			setTask({});

			setTimeout(() => {
				setAlert({})
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				showAlert,
				alert,
				submitProject,
				getProject,
				project,
				loading,
				deleteProject,
				modalFormTask,
				handleModalTask,
				submitTask,
				handleModalEditTask,
				task,
				modalDeleteTask,
				handleModalDeleteTask,
				deleteTask,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export { ProjectsProvider };

export default ProjectsContext;

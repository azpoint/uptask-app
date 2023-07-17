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
				// navigate("/projects");
			}, 4000);
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

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				showAlert,
				alert,
				submitProject,
				getProject,
				project,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export { ProjectsProvider };

export default ProjectsContext;

import { useEffect } from "react";
import io from "socket.io-client"

import useProjects from "../hooks/useProjects";

import ProjectPreview from "../components/ProjectPreview";
import Alert from "../components/Alert";

let socket;

const Projects = () => {

	const { projects, alert } = useProjects();
	const { msg } = alert;

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKENDURL)
	}, [])

	return (
		<>
			<h1 className="text-4xl font-black">Projects</h1>

			{ msg && <Alert alert={alert}/>}

			<div className="bg-white shadow mt-10 rounded-lg">
				{projects.length ? projects.map(project => 
					<ProjectPreview 
					key={project._id}
					project={project}
					/>
				) : <p className="text-center text-gray-60 uppercase p-5">No projects here</p>}
			</div>
		</>
	);
};
export default Projects;

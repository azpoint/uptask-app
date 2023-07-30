import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";

import ModalTask from "../components/ModalFormTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import ProjectTask from "../components/ProjectTask";
import Alert from "../components/Alert";
import Collaborator from "../components/Collaborator";

const Project = () => {
	const params = useParams();

	const { getProject, project, loading, handleModalTask, alert } =
		useProjects();

	const admin = useAdmin();

	useEffect(() => {
		getProject(params.id);
	}, []);

	const { name } = project;

	const { msg } = alert;

	if(loading) return "Loading...";
	
	return  (
		<>
			<div className="flex justify-between">
				<h1 className="font-bold text-4xl">{name}</h1>

				{admin && (
					<div className="flex items-end text-gray-400 hover:text-black">
						<Link
							to={`/projects/edit/${params.id}`}
							className="uppercase font-semibold flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
								/>
							</svg>
							Edit
						</Link>
					</div>
				)}
			</div>

			{admin && (
				<button
					onClick={handleModalTask}
					type="button"
					className="flex gap-2 text-sm px-5 py-3 w-full md:w-auto rounded-md uppercase font-semibold bg-sky-400 text-white text-center mt-5 items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
							clipRule="evenodd"
						/>
					</svg>
					New Task
				</button>
			)}

			<p className="font-semibold text-lg mt-10">Project Task</p>

			<div className="flex justify-center">
				<div className="md:w-1/3 lg:w-1/4">
					{msg && <Alert alert={alert} />}
				</div>
			</div>

			<div className="bg-white shadow mt-10 rounded-lg">
				{project.tasks?.length ? (
					project.tasks?.map((task) => (
						<ProjectTask key={task._id} task={task} />
					))
				) : (
					<p className="text-center my-5 p-10">No tasks in here</p>
				)}
			</div>

			{admin && (
				<>
					<div className="flex items-center justify-between mt-10">
						<p className="font-semibold text-lg mt-10">Collaborators</p>

						<Link
							to={`/projects/new-collaborator/${project._id}`}
							className="text-gray-400 uppercase font-semibold hover:text-black"
						>
							Add
						</Link>
					</div>

					<div className="bg-white shadow mt-10 rounded-lg">
						{project.coll?.length ? (
							project.coll?.map((collaborator) => (
								<Collaborator
									key={collaborator._id}
									collaborator={collaborator}
								/>
							))
						) : (
							<p className="text-center my-5 p-10">
								No collabs in here in here
							</p>
						)}
					</div>
				</>
			)}

			<ModalTask />
			<ModalDeleteTask />
			<ModalDeleteCollaborator />
		</>
	);
};
export default Project;

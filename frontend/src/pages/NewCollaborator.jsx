import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProjects from "../hooks/useProjects";

import CollaboratorForm from "../components/CollaboratorForm";
import Alert from "../components/Alert";

const NewCollaborator = () => {
	const { getProject, project, loading, collaborator, addCollaborator, alert } = useProjects();
	const params = useParams();

	useEffect(() => {
		getProject(params.id);
	}, []);


	if(!project?._id) return <Alert alert={alert}/>

	return (
		<>
			<h1 className="text-4xl font-bold">
				Add Collaborator to: <br></br>
				{project.name}
			</h1>

			<div className="mt-10 flex justify-center">
				<CollaboratorForm />
			</div>

			{loading ? <p className='text-center'>Loading...</p> : collaborator._id && (
				<div className="flex justify-center mt-10">
					<div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
						<h2 className="text-cneter mb-10 text-2xl font-semibold">Search Result:</h2>
						
						<div className="flex flex-col items-center">
							<p>{collaborator.name}</p>

							<button type="button"
							className="bg-slate-500 px-5 py-2 mt-4 rounded-lg uppercase text-white font-semibold text-sm"
							onClick={() => addCollaborator({
								email: collaborator.email
							})}
							>
								Add Collaborator
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default NewCollaborator;

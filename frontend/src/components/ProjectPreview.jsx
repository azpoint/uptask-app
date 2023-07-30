/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const ProjectPreview = ({ project }) => {
	const { auth } = useAuth();

	const { name, _id, client, creator } = project;

	return (
		<div className="border-b p-5 flex">
			<p className="flex-1">
				{name}
				<span className="text-sm text-gray-500 uppercase"> {client}</span>
			</p>

			{auth._id !== creator && (
				<p className="mr-4 text-gray-50 bg-green-500 p-1 rounded-md">Collaborator</p>
			)}

			<Link
				to={`${_id}`}
				className="text-gray-600 hover:text-gray-800 uppercase text-sm font-semibold"
			>
				Project Details
			</Link>
		</div>
	);
};
export default ProjectPreview;

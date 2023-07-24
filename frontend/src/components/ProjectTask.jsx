/* eslint-disable react/prop-types */
import useProjects from "../hooks/useProjects";

import { formatDate } from "../helpers/dateFormater";

const ProjectTask = ({ task }) => {
	const { name, deliveryDate, description, priority, state, _id } = task;

	const { handleModalEditTask, handleModalDeleteTask } = useProjects();

	return (
		<div className="border-b p-5 flex justify-between items-center">
			<div className="flex flex-col gap-2">
				<p className="text-xl">{name}</p>
				<p className="text-lg text-gray-700">Description: {description}</p>
				<p className="text-xl">Delivery Date: {formatDate(deliveryDate)}</p>
				<p className="text-lg text-gray-600">Priority: {priority}</p>
			</div>

			<div className="flex flex-col gap-2">
				<button className="bg-sky-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md"
				onClick={() => handleModalEditTask(task)}
				>
					Edit
				</button>

				{state ? (
					<button className="bg-green-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md">
					Done
				</button>
					
				) : (
					<button className="bg-gray-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md">
						Not Done
					</button>
				)}

				<button className="bg-red-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md"
				onClick={() => handleModalDeleteTask(task)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
export default ProjectTask;

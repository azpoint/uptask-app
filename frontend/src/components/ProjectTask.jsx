/* eslint-disable react/prop-types */
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";

import { formatDate } from "../helpers/dateFormater";

const ProjectTask = ({ task }) => {
	const { name, deliveryDate, description, priority, state, _id } = task;

	const { handleModalEditTask, handleModalDeleteTask, completeTask } =
		useProjects();

	const admin = useAdmin();

	return (
		<div className="border-b p-5 flex justify-between items-center">
			<div className="flex flex-col gap-2">
				<p className="text-xl">{name}</p>
				<p className="text-lg text-gray-700">Description: {description}</p>
				<p className="text-xl">Delivery Date: {formatDate(deliveryDate)}</p>
				<p className="text-lg text-gray-600">Priority: {priority}</p>
				{ state && <p>Completed by: {task.completed.name}</p>}
			</div>

			<div className="flex flex-col lg:flex-row gap-2">
				{admin && (
					<button
						className="bg-sky-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md"
						onClick={() => handleModalEditTask(task)}
					>
						Edit
					</button>
				)}

				<button
					className={`${state ? 'bg-green-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-semibold text-sm rounded-md`}
					onClick={() => completeTask(_id)}
				>
					{state ? "Done" : "Not Done"}
				</button>

				{admin && (
					<button
						className="bg-red-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-md"
						onClick={() => handleModalDeleteTask(task)}
					>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};
export default ProjectTask;

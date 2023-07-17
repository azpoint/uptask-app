import { useState } from "react";
import useProjects from "../hooks/useProjects";

import Alert from "./Alert";

const FormProject = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [client, setClient] = useState("");

	const { showAlert, alert, submitProject } = useProjects();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([name, description, deliveryDate, client].includes("")) {
			showAlert({
				msg: "All fields are required",
				error: true,
			});

			return;
		}

		await submitProject({
			name,
			description,
			deliveryDate,
			client
		});

		setName("");
		setDescription("");
		setDeliveryDate("");
		setClient("");
	};

	const { msg } = alert;

	return (
		<>
			<form
				className="bg-white py-10 px-5 md:w-full rounded-md w-1/2 shadow-lg"
				onSubmit={handleSubmit}
			>
				<div className="mb-5">
					<label
						htmlFor="name"
						className="text-gray-700 uppercase font-semibold text-sm"
					>
						Project Name
					</label>

					<input
						type="text"
						className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						id="name"
						placeholder="Project Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="description"
						className="text-gray-700 uppercase font-semibold text-sm"
					>
						Description
					</label>

					<textarea
						className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						id="description"
						placeholder="Project Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="delivery-date"
						className="text-gray-700 uppercase font-semibold text-sm"
					>
						Delivery Date
					</label>

					<input
						type="date"
						className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						id="delivery-date"
						value={deliveryDate}
						onChange={(e) => setDeliveryDate(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="client"
						className="text-gray-700 uppercase font-semibold text-sm"
					>
						Client Name
					</label>

					<input
						type="text"
						className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						id="client"
						placeholder="Client Name"
						value={client}
						onChange={(e) => setClient(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value="Create Project"
					className="bg-sky-600 w-full p-3 uppercase font-semibold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
				/>
				{msg && <Alert alert={alert} />}
			</form>
		</>
	);
};
export default FormProject;

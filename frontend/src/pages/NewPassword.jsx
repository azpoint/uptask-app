//Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

//Components
import Alert from "../components/Alert";

const NewPassword = () => {
	const [validToken, setValidToken] = useState(false);
	const [alert, setAlert] = useState({});
	const [password, setPassword] = useState("");
	const [modifiedPassword, setModifiedPassword] = useState(false);

	const params = useParams();

	const { token } = params;

	useEffect(() => {
		const checkToken = async () => {
			try {
				await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/users/forgot-password/${token}`
				);
				setValidToken(true);
			} catch (error) {
				setAlert({
					msg: error.response.data.msg,
					error: true,
				});

				return;
			}
		};

		checkToken();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 6) {
			setAlert({
				msg: "Minimum Length Pssword is 6 Characters",
				error: true,
			});

			return;
		}

		try {
			const url = `${
				import.meta.env.VITE_BACKEND_URL
			}/api/users/forgot-password/${token}`;

			const { data } = await axios.post(url, {
				password,
			});

			setAlert({
				msg: data.msg,
				error: false,
			});

			setModifiedPassword(true);
		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Reset your Password
			</h1>

			{validToken && (
				<form
					action=""
					className="mt-20 mb-5 bg-white shadow-lg rounded-lg p-10"
					onSubmit={handleSubmit}
				>
					<div className="my-5">
						<label
							htmlFor="Password"
							className="uppercase text-gray-600 block text-xl font-semibold"
						>
							New Password
						</label>
						<input
							id="Password"
							type="password"
							placeholder="Your New Password Here"
							className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Set New Password"
						className="bg-sky-600 w-full py-3 text-gray-50 uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors mb-5"
					/>
				</form>
			)}

			{msg && <Alert alert={alert} />}

			{modifiedPassword && (
				<Link
					to="/"
					className="block text-center my-5 text-slate-500 uppercase text-sm"
				>
					Sign in here
				</Link>
			)}
		</>
	);
};
export default NewPassword;

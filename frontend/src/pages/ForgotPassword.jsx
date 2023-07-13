//Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Components
import Alert from "../components/Alert";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email === "" || email.length < 6) {
			setAlert({
				msg: "You must provide an email",
				error: true,
			});

			return;
		}

		
		try {
			const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`, {
				email
			})

			setAlert({
				msg: data.msg,
				error: false
			})
		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true
			})
		}
	};

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Change your Password{" "}
			</h1>


			<form
				action=""
				className="mt-20 mb-5 bg-white shadow-lg rounded-lg p-10"
				onSubmit={handleSubmit}
			>
				<div className="my-5">
					<label
						htmlFor="email"
						className="uppercase text-gray-600 block text-xl font-semibold"
					>
						email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Your email"
						className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value="Send Recover email"
					className="bg-sky-600 w-full py-3 text-gray-50 uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors mb-5"
				/>
			</form>

			{msg && <Alert alert={alert} />}

			<nav className="lg:flex lg:justify-between">
				<Link
					to="/"
					className="block text-center my-5 text-slate-500 uppercase text-sm"
				>
					Got an Account? Sign in here
				</Link>

				<Link
					to="/register"
					className="block text-center my-5 text-slate-500 uppercase text-sm"
				>
					No account? Register here
				</Link>
			</nav>
		</>
	);
};
export default ForgotPassword;

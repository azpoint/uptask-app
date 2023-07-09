//Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Components
import Alert from "../components/Alert";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [alert, setAlert] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([name, email, password, repeatPassword].includes("")) {
			setAlert({
				msg: "All Fields are Mandatory",
				error: true,
			});
			return;
		}

		if (password !== repeatPassword) {
			setAlert({
				msg: "Passwords do not match",
				error: true,
			});
			return;
		}

		if (password.length < 8) {
			setAlert({
				msg: "8 characters minimum",
				error: true,
			});
			return;
		}

		setAlert({});

		//Create user in the API
		try {
			const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
				name,
				email,
				password,
			});

			setAlert({
				msg: data.msg,
				error: false
			});

			setName("");
			setEmail("");
			setPassword("");
			setRepeatPassword("");

		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true
			});
		}
	};

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Create your account and manage your{" "}
				<span className="bg-slate-700 text-gray-50 pb-4 px-3 rounded-md align-bottom leading-4 font-semibold">
					projects
				</span>
			</h1>

			<form
				action=""
				onSubmit={handleSubmit}
				className="mt-20 mb-5 bg-white shadow-lg rounded-lg p-10"
			>
				<div className="my-5">
					<label
						htmlFor="name"
						className="uppercase text text-gray-600 block text-xl font-semibold"
					>
						Name
					</label>

					<input
						id="name"
						type="text"
						placeholder="Your Name"
						className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

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
						placeholder="email for registration"
						className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="my-5">
					<label
						htmlFor="Password"
						className="uppercase text-gray-600 block text-xl font-semibold"
					>
						Password
					</label>
					<input
						id="Password"
						type="password"
						placeholder="Your Password"
						className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="my-5">
					<label
						htmlFor="repeatPassword"
						className="uppercase text-gray-600 block text-xl font-semibold"
					>
						Repeat Password
					</label>
					<input
						id="repeatPassword"
						type="password"
						placeholder="Repeat Your Password"
						className="w-full mt-3 p-2 border rounded-lg bg-gray-50"
						value={repeatPassword}
						onChange={(e) => setRepeatPassword(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value="Create Account"
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
					to="/forgot-password"
					className="block text-center my-5 text-slate-500 uppercase text-sm"
				>
					Forgot Password
				</Link>
			</nav>
		</>
	);
};
export default Register;

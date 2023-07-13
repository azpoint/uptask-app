import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//Components
import Alert from "../components/Alert";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alert, setAlert] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([email, password].includes("")) {
			setAlert({
				msg: "All fields are required",
				error: true,
			});

			return;
		}

		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/users/login`,
				{
					email,
					password
				}
			);

			setAlert({});
			localStorage.setItem('token', data.token)
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
				Login and manage your{" "}
				<span className="bg-slate-700 text-gray-50 pb-4 px-3 rounded-md align-bottom leading-4 font-semibold">
					projects
				</span>
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

				<input
					type="submit"
					value="Login"
					className="bg-sky-600 w-full py-3 text-gray-50 uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors mb-5"
				/>
			</form>

			{msg && <Alert alert={alert} />}

			<nav className="lg:flex lg:justify-between">
				<Link
					to="/register"
					className="block text-center my-5 text-slate-500 uppercase text-sm"
				>
					No account? Register here
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
export default Login;

import { Link } from "react-router-dom";

const ForgotPassword = () => {
	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Change your Password{" "}
			</h1>

			<form action="" className="my-20 bg-white shadow-lg rounded-lg p-10">
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
					/>
				</div>

				<input
					type="submit"
					value="Send Recover email"
					className="bg-sky-600 w-full py-3 text-gray-50 uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors mb-5"
				/>
			</form>

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

import { Link } from "react-router-dom";

import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";

import Search from "../components/Search"

const Header = () => {
	const { handleSearch, logoutSessions } = useProjects();
	const { logoutSessionsAuth } = useAuth();

	const handleLogout = () => {
		logoutSessions()
		logoutSessionsAuth()
		localStorage.removeItem("token")
	}

	return (
		<header className="px-4 py-5 bg-white border-b">
			<div className="md:flex md:justify-between">
				<h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

				<div className="flex flex-col md:flex-row items-center gap-4">

					<button
					type="button"
					className="font-semibold uppercase"
					onClick={handleSearch}
					>
						Search Project
					</button>

					<Link to="/projects" className="font-semibold uppercase">
						Projects
					</Link>

					<button
						type="button"
						className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-semibold"
					onClick={handleLogout}
					>
						Logout
					</button>

					<Search />
				</div>
			</div>
		</header>
	);
};
export default Header;

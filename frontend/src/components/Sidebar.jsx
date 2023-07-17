import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Sidebar = () => {

	const { auth } = useAuth();

  return (
	<aside className="md:w-80 lg:w-96 px-5 py-10">
		<p className="text-xl font-semibold">Hi {auth.name}</p>

		<Link to="create-project"
		className="bg-sky-600 w-full p-3 text-white uppercase font-semibold block mt-5 text-center rounded-md">
			New Project
		</Link>
	</aside>
  )
}
export default Sidebar
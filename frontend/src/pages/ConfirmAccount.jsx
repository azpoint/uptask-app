import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
	const [alert, setAlert] = useState({});
	const [confirmAccount, setConfirmAccount] = useState(false);

	const params = useParams();

	const { token } = params;

	useEffect(() => {
		const confirmAccount = async () => {
			try {
				const url = `http://localhost:4000/api/users/confirm/${token}`;
				const { data } = await axios.get(url);

				console.log(data);

				setAlert({
					msg: data.msg,
					error: false,
				});

				setConfirmAccount(true);
			} catch (error) {
				setAlert({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};

		confirmAccount();
	}, []);

	const { msg } = alert;

	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Confirm Your Account
			</h1>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
				{msg && <Alert alert={alert} />}

				{setConfirmAccount && (
					<Link
						to="/"
						className="block text-center my-5 text-slate-500 uppercase text-sm"
					>
						Sign in here
					</Link>
				)}
			</div>
		</>
	);
};
export default ConfirmAccount;

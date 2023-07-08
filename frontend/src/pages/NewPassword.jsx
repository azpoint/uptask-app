const NewPassword = () => {
	return (
		<>
			<h1 className="text-sky-600 font-bold text-6xl capitalize">
				Reset your Password
			</h1>

			<form action="" className="my-20 bg-white shadow-lg rounded-lg p-10">
				

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
					/>
				</div>

				<input
					type="submit"
					value="Set New Password"
					className="bg-sky-600 w-full py-3 text-gray-50 uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors mb-5"
				/>
			</form>
		</>
	);
};
export default NewPassword;

/* eslint-disable react/prop-types */
const Alert = ({ alert }) => {
	return (
		<div
			className={`${
				alert.error ? "from-red-700 to-red-400" : "from-sky-400 to-sky-600"
			} bg-gradient-to-t text-center p-3 rounded-lg uppercase text-gray-50 my-2 font-semibold`}>
				{alert.msg}
			</div>
	);
};
export default Alert;

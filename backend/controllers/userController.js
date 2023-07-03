import User from "../db/models/User.js";
import genId from "../helpers/genId.js";

const register = async (req, res) => {
	//Avoid duplicated users
	const { email } = req.body;
	const isUser = await User.findOne({ email });

	if (isUser) {
		const error = new Error("User already registered");
		return res.status(400).json({ msg: error.message });
	}

	try {
		const user = new User(req.body);
		user.token = genId();
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		console.log(error);
	}
};

const authentication = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	//Check if user exist
	if (!user) {
		const error = new Error("User does not exist");
		return res.status(404).json({ msg: error.message });
	}

	//Check if user is confirmed
	if (!user.confirm) {
		const error = new Error("Your account is not confirmed");
		return res.status(403).json({ msg: error.message });
	}
};

export { register, authentication };

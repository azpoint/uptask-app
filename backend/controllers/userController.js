import User from "../db/models/User.js";

const register = async (req, res) => {
	//Avoid duplicated users
	const { email } = req.body;
	const isUser = await User.findOne({email})


	if(isUser) {
		const error = new Error('User already registered');
		return res.status(400).json({msg:error.message})
	}

	try {
		const user = new User(req.body);
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		console.log(error);
	}
};

export { register };

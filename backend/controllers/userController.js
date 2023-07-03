import User from "../db/models/User.js";
import genId from "../helpers/genId.js";
import genJWT from "../helpers/genJWT.js"

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
	if (!user.confirmed) {
		const error = new Error("Your account is not confirmed");
		return res.status(403).json({ msg: error.message });
	};

	//Check Password
	if(await user.checkPassword(password)) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: genJWT(user._id)
		})
	} else {
		const error = new Error("Wrong Password");
		return res.status(403).json({ msg: error.message });
	}
};

const confirm = async (req, res) => {
	const { token } = req.params

	const confirmUser = await User.findOne({ token });

	if(!confirmUser) {
		const error = new Error("Token not valid");
		return res.status(403).json({ msg: error.message });
	}

	try {
		confirmUser.confirm = true;
		confirmUser.token = "";
		console.log(confirmUser);

		await confirmUser.save();
		res.json({msg: "User Confirmed"})


	} catch (error) {
		console.log(error)
	}

}

export { register, authentication, confirm };

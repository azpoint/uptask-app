import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const url = `${connection.connection.host}:${connection.connection.port}`;
		console.log(`DB Connected on: ${url}`)
	} catch {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
}

export default connectDB;
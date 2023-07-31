//Dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//DB
import connectDB from "./db/config/db.js"

//Router
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()
connectDB();
const app = express();
app.use(express.json());

//CORS setup
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
	origin: function(origin, callback) {
		if(whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("CORS error"));
		}
	}
}

app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/task", taskRoutes);


app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
});

//Socket.io


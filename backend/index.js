//Dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//DB
import connectDB from "./db/config/db.js";

//Router
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//CORS setup
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("CORS error"));
		}
	},
};

app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/task", taskRoutes);

const appServer = app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

//Socket.io
import { Server } from "socket.io";

const io = new Server(appServer, {
	pingTimeout: 60000,
	cors: {
		origin: process.env.FRONTEND_URL,
	},
});

io.on("connection", (socket) => {
	console.log("Connected to Socket.io");

	//Define socket io events
	socket.on("open-project", (project) => {
		socket.join(project);
	})

	socket.on("new-task", (task) => {
		const project = task.project;
		socket.to(project).emit("task-added", task);
	})

	socket.on("delete-task", task => {
		const project = task.project
		socket.to(project).emit("deleted-task", task)
	})

	socket.on("update-task", task => {
		const project = task.project._id
		socket.to(project).emit("updated-task", task)
	})

	socket.on("change-state", task => {
		const project = task.project._id
		socket.to(project).emit("new-state", task)
	})
});

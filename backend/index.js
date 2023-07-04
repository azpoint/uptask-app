//Dependencies
import express from "express"
import dotenv from "dotenv"

//DB
import connectDB from "./db/config/db.js"

//Router
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
connectDB();
const app = express();
app.use(express.json());

//Routing
app.use("/api/users", userRoutes);


app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})


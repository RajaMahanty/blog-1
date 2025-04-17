import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

// routes import
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// database
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

// listen
app.listen(process.env.PORT || 8080, () => {
	console.log(
		`Server running on ${process.env.DEV_MODE} in port ${process.env.PORT}`
			.bgCyan
	);
});

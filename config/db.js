import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || "mongodb://localhost:27017/blog-1"
		);
		console.log(`Connected to database`.bgMagenta.white);
	} catch (error) {
		console.log(`Database connection error ${error}`.bgRed.white);
	}
};

export { connectDB };

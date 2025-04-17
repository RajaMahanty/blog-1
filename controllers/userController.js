import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

// get all users
const getAllUsersController = async (req, res) => {
	try {
		const users = await userModel.find({});
		return res.status(200).send({
			userCount: users.length,
			success: true,
			message: "All users data",
			users,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Error in Get all Users",
			error,
		});
	}
};

// create user register user
const registerController = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		// validation
		if (!username || !email || !password)
			return res.status(400).send({
				message: "Please fill all the fields!",
				success: false,
			});
		// existing user
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res.status(401).send({
				success: false,
				message: "User already exists",
			});
		}
		// hashing password
		const hashedPassword = await bcrypt.hash(password, 10);
		// save new user
		const user = new userModel({
			username,
			email,
			password: hashedPassword,
		});
		await user.save();
		return res.status(201).send({
			success: true,
			message: "New user created!",
			user: {
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Error in register callback!",
			success: false,
			error,
		});
	}
};

// login
const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		// validation
		if (!email || !password) {
			return res.status(401).send({
				success: false,
				message: "Please provide email and password",
			});
		}
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(200).send({
				success: false,
				message: "Email is not registered!",
			});
		}
		// password check
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).send({
				success: false,
				message: "Invalid username or password!",
			});
		}
		return res.status(200).send({
			success: true,
			message: "Logged in Successfully!",
			user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Error in login callback!",
			error,
		});
	}
};

export { getAllUsersController, registerController, loginController };

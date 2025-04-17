import express from "express";
import {
	getAllUsersController,
	loginController,
	registerController,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/all-users", getAllUsersController);

userRoutes.post("/register", registerController);

userRoutes.post("/login", loginController);

export default userRoutes;

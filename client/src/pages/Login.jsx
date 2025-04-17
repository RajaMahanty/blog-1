import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// state
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	// handle input change
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	// form handle
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/users/login", {
				email: inputs.email,
				password: inputs.password,
			});

			if (data.success) {
				localStorage.setItem("userId", data?.user._id);
				dispatch(authActions.login());
				toast.success("Logged in successfully!");
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			toast.error("Login failed. Please check your credentials.");
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#f5f7fa",
				py: 4,
			}}
		>
			<Box className="container">
				<Paper
					elevation={3}
					sx={{
						maxWidth: 450,
						mx: "auto",
						p: 4,
						borderRadius: "12px",
						backgroundColor: "#ffffff",
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						sx={{
							mb: 4,
							fontWeight: 600,
							color: "#1976d2",
							textAlign: "center",
						}}
					>
						Login
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Email"
							value={inputs.email}
							name="email"
							margin="normal"
							type="email"
							required
							onChange={handleChange}
							fullWidth
							sx={{
								mb: 3,
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderRadius: "8px",
									},
								},
							}}
						/>
						<TextField
							label="Password"
							value={inputs.password}
							name="password"
							margin="normal"
							type="password"
							required
							onChange={handleChange}
							fullWidth
							sx={{
								mb: 3,
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderRadius: "8px",
									},
								},
							}}
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							sx={{
								py: 1.5,
								mt: 2,
								borderRadius: "8px",
								fontSize: "1.1rem",
								backgroundColor: "#1976d2",
								"&:hover": {
									backgroundColor: "#1565c0",
								},
							}}
						>
							Login
						</Button>
						<Button
							onClick={() => navigate("/register")}
							variant="text"
							fullWidth
							sx={{
								mt: 2,
								color: "#1976d2",
								"&:hover": {
									backgroundColor: "transparent",
									textDecoration: "underline",
								},
							}}
						>
							Don't have an account? Register
						</Button>
					</form>
				</Paper>
			</Box>
		</Box>
	);
};

export default Login;

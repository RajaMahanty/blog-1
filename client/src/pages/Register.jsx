import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	// state
	const [inputs, setInputs] = useState({
		name: "",
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
			const { data } = await axios.post("/users/register", {
				username: inputs.name,
				email: inputs.email,
				password: inputs.password,
			});

			if (data.success) {
				toast.success("Registered successfully!");
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
			toast.error("Registration failed. Please try again.");
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
						Register
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Name"
							value={inputs.name}
							name="name"
							margin="normal"
							type="text"
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
							Register
						</Button>
						<Button
							onClick={() => navigate("/login")}
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
							Already Registered? Please Login
						</Button>
					</form>
				</Paper>
			</Box>
		</Box>
	);
};

export default Register;

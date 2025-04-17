import React, { useState } from "react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StyledBox = styled(Box)(({ theme }) => ({
	maxWidth: 450,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	margin: "auto",
	marginTop: theme.spacing(5),
	boxShadow: "10px 10px 20px #ccc",
	padding: theme.spacing(3),
	borderRadius: 5,
	backgroundColor: "#f9f9f9",
}));

const StyledButton = styled(Button)(({ theme }) => ({
	borderRadius: 3,
	marginTop: theme.spacing(3),
	textTransform: "none",
	fontWeight: "bold",
}));

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
		<>
			<form onSubmit={handleSubmit}>
				<StyledBox>
					<Typography
						sx={{ textTransform: "uppercase", color: "#333" }}
						variant="h4"
						padding={3}
						textAlign={"center"}
					>
						Register
					</Typography>
					<TextField
						placeholder="Name"
						value={inputs.name}
						name="name"
						margin="normal"
						type="text"
						required
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						placeholder="Email"
						value={inputs.email}
						name="email"
						margin="normal"
						type="email"
						required
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						placeholder="Password"
						value={inputs.password}
						name="password"
						margin="normal"
						type="password"
						required
						onChange={handleChange}
						fullWidth
					/>
					<StyledButton
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Register
					</StyledButton>
					<StyledButton
						onClick={() => navigate("/login")}
						variant="text"
						fullWidth
					>
						Already Registered? Please Login
					</StyledButton>
				</StyledBox>
			</form>
		</>
	);
};

export default Register;

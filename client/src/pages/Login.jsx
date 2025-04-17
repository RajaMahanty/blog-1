import React, { useState } from "react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

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
				toast.success("Logged in successfully!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			toast.error("Login failed. Please check your credentials.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
			});
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
						Login
					</Typography>
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
						sx={{ borderRadius: 3, marginTop: 3 }}
					>
						Submit
					</StyledButton>
					<StyledButton
						onClick={() => navigate("/register")}
						sx={{ borderRadius: 3, marginTop: 3 }}
					>
						Don't have an account? Register
					</StyledButton>
				</StyledBox>
			</form>
			<ToastContainer />
		</>
	);
};

export default Login;

import React, { useState } from "react";
import {
	Box,
	Button,
	InputLabel,
	TextField,
	Typography,
	Container,
	TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		title: "",
		description: "",
		image: "",
	});

	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = localStorage.getItem("userId");
			const { data } = await axios.post("/blogs/create-blog", {
				title: inputs.title,
				description: inputs.description,
				image: inputs.image,
				user: user,
			});

			if (data?.success) {
				toast.success("Blog Created Successfully!");
				navigate("/my-blogs");
			}
		} catch (error) {
			toast.error("Error Occured Creating Blog!");
			console.log(error);
		}
	};

	// handle change
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<form onSubmit={handleSubmit}>
				<Box
					border={2}
					borderColor="primary.main"
					borderRadius={4}
					padding={4}
					margin={"auto"}
					boxShadow={"0 8px 24px rgba(0,0,0,0.12)"}
					display={"flex"}
					flexDirection={"column"}
					width={"100%"}
					marginTop="40px"
					marginBottom="40px"
					bgcolor="background.default"
					position="relative"
					sx={{
						"&:before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: 4,
							background:
								"linear-gradient(45deg, rgba(25,118,210,0.05), rgba(25,118,210,0.1))",
							zIndex: 0,
						},
					}}
				>
					<Typography
						variant="h3"
						textAlign={"center"}
						fontWeight="bold"
						padding={3}
						color="primary.main"
						gutterBottom
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							background: "linear-gradient(45deg, #1976d2, #2196f3)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Create a New Blog Post
					</Typography>
					<InputLabel
						sx={{
							mb: 1,
							mt: 2,
							fontSize: "20px",
							fontWeight: "700",
							color: "text.primary",
							letterSpacing: "0.02em",
						}}
					>
						Title
					</InputLabel>
					<TextField
						name="title"
						value={inputs.title}
						onChange={handleChange}
						margin="dense"
						variant="outlined"
						placeholder="Enter your blog title"
						fullWidth
						required
						sx={{
							"& .MuiOutlinedInput-root": {
								"&:hover fieldset": {
									borderColor: "primary.main",
									borderWidth: 2,
								},
								"&.Mui-focused fieldset": {
									borderColor: "primary.main",
									borderWidth: 2,
								},
							},
						}}
					/>
					<InputLabel
						sx={{
							mb: 1,
							mt: 3,
							fontSize: "20px",
							fontWeight: "700",
							color: "text.primary",
							letterSpacing: "0.02em",
						}}
					>
						Description
					</InputLabel>
					<TextareaAutosize
						name="description"
						value={inputs.description}
						onChange={handleChange}
						placeholder="Write your blog content"
						minRows={8}
						required
						style={{
							width: "100%",
							padding: "16px",
							fontSize: "16px",
							borderRadius: "8px",
							border: "2px solid #e0e0e0",
							fontFamily: "inherit",
							resize: "vertical",
							outline: "none",
							transition: "all 0.3s ease",
							backgroundColor: "transparent",
							position: "relative",
							zIndex: 1,
						}}
					/>
					<InputLabel
						sx={{
							mb: 1,
							mt: 3,
							fontSize: "20px",
							fontWeight: "700",
							color: "text.primary",
							letterSpacing: "0.02em",
						}}
					>
						Image URL
					</InputLabel>
					<TextField
						name="image"
						value={inputs.image}
						onChange={handleChange}
						margin="dense"
						variant="outlined"
						placeholder="Enter image URL for your blog"
						fullWidth
						required
						sx={{
							"& .MuiOutlinedInput-root": {
								"&:hover fieldset": {
									borderColor: "primary.main",
									borderWidth: 2,
								},
								"&.Mui-focused fieldset": {
									borderColor: "primary.main",
									borderWidth: 2,
								},
							},
						}}
					/>
					<Button
						type="submit"
						color="primary"
						variant="contained"
						size="large"
						sx={{
							mt: 4,
							mb: 2,
							py: 2,
							fontSize: "18px",
							fontWeight: "700",
							borderRadius: 3,
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							background: "linear-gradient(45deg, #1976d2, #2196f3)",
							boxShadow: "0 4px 16px rgba(25,118,210,0.3)",
							"&:hover": {
								background: "linear-gradient(45deg, #1565c0, #1976d2)",
								transform: "translateY(-2px)",
								boxShadow: "0 8px 24px rgba(25,118,210,0.4)",
							},
							transition: "all 0.3s ease",
						}}
					>
						Create Post
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default CreateBlog;

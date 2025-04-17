import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Paper,
	useTheme,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const CreateBlog = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();

	const [inputs, setInputs] = useState({
		title: "",
		description: "",
		image: "",
	});

	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
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
			toast.error("Error Occurred Creating Blog!");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// handle change
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
				py: 4,
			}}
		>
			<Container maxWidth="md">
				<Paper
					elevation={0}
					sx={{
						p: { xs: 3, md: 6 },
						borderRadius: 3,
						background: "rgba(255, 255, 255, 0.9)",
						backdropFilter: "blur(10px)",
						boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
					}}
				>
					<Typography
						variant="h3"
						component="h1"
						sx={{
							fontWeight: 700,
							color: theme.palette.primary.main,
							textAlign: "center",
							mb: 4,
							background: "linear-gradient(45deg, #1976d2, #2196f3)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							fontSize: { xs: "2rem", md: "2.5rem" },
						}}
					>
						Create a New Blog Post
					</Typography>

					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<TextField
							name="title"
							label="Title"
							value={inputs.title}
							onChange={handleChange}
							fullWidth
							required
							variant="outlined"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "white",
									"&:hover fieldset": {
										borderColor: "primary.main",
									},
									"&.Mui-focused fieldset": {
										borderColor: "primary.main",
									},
								},
							}}
						/>

						<TextField
							name="description"
							label="Description"
							value={inputs.description}
							onChange={handleChange}
							fullWidth
							required
							multiline
							rows={10}
							variant="outlined"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "white",
									"&:hover fieldset": {
										borderColor: "primary.main",
									},
									"&.Mui-focused fieldset": {
										borderColor: "primary.main",
									},
								},
							}}
						/>

						<TextField
							name="image"
							label="Image URL"
							value={inputs.image}
							onChange={handleChange}
							fullWidth
							required
							variant="outlined"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "white",
									"&:hover fieldset": {
										borderColor: "primary.main",
									},
									"&.Mui-focused fieldset": {
										borderColor: "primary.main",
									},
								},
							}}
						/>

						<Box
							sx={{
								display: "flex",
								gap: 2,
								justifyContent: "center",
								mt: 4,
							}}
						>
							<Button
								type="submit"
								variant="contained"
								size="large"
								sx={{
									px: 6,
									py: 2,
									borderRadius: 2,
									fontSize: "1.2rem",
									backgroundColor: theme.palette.primary.main,
									"&:hover": {
										backgroundColor: theme.palette.primary.dark,
										transform: "translateY(-2px)",
										boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
									},
									transition: "all 0.3s ease",
								}}
							>
								Create Blog
							</Button>
							<Button
								variant="outlined"
								size="large"
								onClick={() => navigate("/my-blogs")}
								sx={{
									px: 6,
									py: 2,
									borderRadius: 2,
									fontSize: "1.2rem",
									color: theme.palette.primary.main,
									borderColor: theme.palette.primary.main,
									"&:hover": {
										backgroundColor: theme.palette.primary.main,
										color: "white",
										borderColor: theme.palette.primary.main,
										transform: "translateY(-2px)",
										boxShadow: "0 4px 20px rgba(25, 118, 210, 0.2)",
									},
									transition: "all 0.3s ease",
								}}
							>
								Cancel
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default CreateBlog;

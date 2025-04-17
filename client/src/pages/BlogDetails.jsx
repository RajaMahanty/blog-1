import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const BlogDetails = () => {
	const [blog, setBlog] = useState({});
	const [inputs, setInputs] = useState({
		title: "",
		description: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState(true);
	const id = useParams().id;
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// get blog details
	const getBlogDetails = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(`/blogs/get-blog/${id}`);
			if (data?.success) {
				setBlog(data?.blog);
				setInputs({
					title: data?.blog.title,
					description: data?.blog.description,
					image: data?.blog.image,
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getBlogDetails();
	}, [id]);

	// handle input change
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`/blogs/update-blog/${id}`, {
				title: inputs.title,
				description: inputs.description,
				image: inputs.image,
			});
			if (data?.success) {
				toast.success("Blog Updated Successfully!");
				navigate("/my-blogs");
			}
		} catch (error) {
			console.log(error);
			toast.error("Error updating blog!");
		}
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
						variant="h4"
						component="h1"
						sx={{
							fontWeight: 700,
							color: theme.palette.primary.main,
							mb: 4,
							textAlign: "center",
						}}
					>
						Update Blog
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							name="title"
							value={inputs.title}
							onChange={handleChange}
							label="Title"
							variant="outlined"
							fullWidth
							required
							sx={{ mb: 3 }}
						/>
						<TextField
							name="description"
							value={inputs.description}
							onChange={handleChange}
							label="Description"
							variant="outlined"
							fullWidth
							required
							multiline
							rows={4}
							sx={{ mb: 3 }}
						/>
						<TextField
							name="image"
							value={inputs.image}
							onChange={handleChange}
							label="Image URL"
							variant="outlined"
							fullWidth
							required
							sx={{ mb: 4 }}
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth={isMobile}
							size="large"
							sx={{
								py: 1.5,
								px: 4,
								borderRadius: 2,
								boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
								"&:hover": {
									transform: "translateY(-2px)",
									boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
								},
							}}
						>
							UPDATE
						</Button>
					</form>
				</Paper>
			</Container>
		</Box>
	);
};

export default BlogDetails;

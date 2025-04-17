import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import LoadingScreen from "../components/LoadingScreen";
import {
	Box,
	Container,
	Grid,
	TextField,
	Typography,
	InputAdornment,
	Paper,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// get blogs
	const getAllBlogs = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get("/blogs/all-blogs");
			if (data?.success) {
				setBlogs(data?.blogs);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getAllBlogs();
	}, []);

	const filteredBlogs = blogs.filter(
		(blog) =>
			blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			blog.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Container maxWidth="xl" sx={{ py: 6 }}>
			<Paper
				elevation={0}
				sx={{
					p: 4,
					mb: 6,
					borderRadius: 2,
					background: "linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: isMobile ? "column" : "row",
						alignItems: "center",
						justifyContent: "space-between",
						mb: 4,
						gap: 2,
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						sx={{
							fontWeight: 700,
							color: theme.palette.primary.main,
							textAlign: isMobile ? "center" : "left",
						}}
					>
						Explore Blogs
					</Typography>
					<TextField
						fullWidth={isMobile}
						variant="outlined"
						placeholder="Search blogs..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon color="primary" />
								</InputAdornment>
							),
						}}
						sx={{
							maxWidth: isMobile ? "100%" : "400px",
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								backgroundColor: "white",
							},
						}}
					/>
				</Box>
			</Paper>

			{filteredBlogs.length === 0 ? (
				<Paper
					elevation={0}
					sx={{
						p: 4,
						textAlign: "center",
						borderRadius: 2,
						backgroundColor: "background.paper",
					}}
				>
					<Typography
						variant="h6"
						sx={{
							color: "text.secondary",
						}}
					>
						No blogs found matching your search.
					</Typography>
				</Paper>
			) : (
				<Box
					sx={{
						columnCount: { xs: 1, sm: 2, md: 3 },
						columnGap: 3,
						"& > *": {
							breakInside: "avoid",
							mb: 3,
							height: "fit-content",
						},
					}}
				>
					{filteredBlogs.map((blog) => (
						<Box key={blog._id} sx={{ height: "100%" }}>
							<BlogCard
								id={blog._id}
								title={blog.title}
								description={blog.description}
								image={blog.image}
								username={blog.user.username}
								createdAt={blog.createdAt}
								sx={{ height: "100%" }}
							/>
						</Box>
					))}
				</Box>
			)}
		</Container>
	);
};

export default Blogs;

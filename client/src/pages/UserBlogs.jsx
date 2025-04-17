import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import {
	Typography,
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	Paper,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import SearchIcon from "@mui/icons-material/Search";

const UserBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// get user blogs
	const getUserBlogs = async () => {
		try {
			setIsLoading(true);
			const id = localStorage.getItem("userId");
			const { data } = await axios.get(`/blogs/user-blog/${id}`);
			if (data?.success) {
				setBlogs(data?.userBlogs?.blogs || []);
				setUsername(data?.userBlogs?.username);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getUserBlogs();
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
						My Blogs
					</Typography>
					<TextField
						fullWidth={isMobile}
						variant="outlined"
						placeholder="Search my blogs..."
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
						{searchQuery
							? "No blogs found matching your search."
							: "No blogs found. Create your first blog!"}
					</Typography>
				</Paper>
			) : (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(3, 1fr)",
						},
						gap: 3,
					}}
				>
					{filteredBlogs.map((blog) => (
						<Box key={blog._id}>
							<BlogCard
								title={blog.title}
								description={blog.description}
								image={blog.image}
								username={username}
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

export default UserBlogs;

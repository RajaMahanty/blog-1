import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Typography, Box } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";

const UserBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	// get user blogs
	const getUserBlogs = async () => {
		try {
			setIsLoading(true);
			const id = localStorage.getItem("userId");
			const { data } = await axios.get(`/blogs/user-blog/${id}`);
			if (data?.success) {
				setBlogs(data?.userBlogs?.blogs || []);
				setUsername(data?.userBlogs?.username);
				console.log("Received blogs:", data?.userBlogs?.blogs);
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

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Box className="container fade-in" sx={{ py: 4 }}>
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
				My Blogs
			</Typography>
			{blogs.length === 0 ? (
				<Typography
					variant="h6"
					sx={{
						textAlign: "center",
						color: "text.secondary",
						mt: 4,
					}}
				>
					No blogs found. Create your first blog!
				</Typography>
			) : (
				blogs.map((blog) => (
					<BlogCard
						key={blog._id}
						title={blog.title}
						description={blog.description}
						image={blog.image}
						username={username}
						createdAt={blog.createdAt}
					/>
				))
			)}
		</Box>
	);
};

export default UserBlogs;

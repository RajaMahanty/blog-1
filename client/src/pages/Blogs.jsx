import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import LoadingScreen from "../components/LoadingScreen";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<div>
			{blogs &&
				blogs.map((blog) => (
					<BlogCard
						key={blog._id}
						title={blog.title}
						description={blog.description}
						image={blog.image}
						username={blog.user.username}
						createdAt={blog.createdAt}
					/>
				))}
		</div>
	);
};

export default Blogs;

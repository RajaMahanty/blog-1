import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);

	// get blogs
	const getAllBlogs = async () => {
		try {
			const { data } = await axios.get("/blogs/all-blogs");
			if (data?.success) {
				setBlogs(data?.blogs);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllBlogs();
	}, []);
	console.log(blogs);
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

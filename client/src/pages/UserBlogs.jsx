import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");

	// get user blogs
	const getUserBlogs = async () => {
		try {
			const id = localStorage.getItem("userId");
			const { data } = await axios.get(`/blogs/user-blog/${id}`);
			if (data?.success) {
				setBlogs(data?.userBlogs?.blogs || []);
				setUsername(data?.userBlogs?.username);
				console.log("Received blogs:", data?.userBlogs?.blogs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserBlogs();
	}, []);

	return (
		<div>
			{blogs &&
				blogs.map((blog) => (
					<BlogCard
						key={blog._id}
						title={blog.title}
						description={blog.description}
						image={blog.image}
						username={username}
						createdAt={blog.createdAt}
					/>
				))}
		</div>
	);
};

export default UserBlogs;

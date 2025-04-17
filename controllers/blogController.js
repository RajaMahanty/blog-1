import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

const getAllBlogsController = async (req, res) => {
	try {
		const blogs = await blogModel.find({}).populate("user");
		if (!blogs) {
			return res.status(200).send({
				success: false,
				message: "No Blogs Found",
			});
		}
		return res.status(200).send({
			success: true,
			BlogCount: blogs.length,
			message: "All Blogs lists", 
			blogs,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Error while getting blogs",
			error,
		});
	}
};

const createBlogController = async (req, res) => {
	try {
		const { title, description, image, user } = req.body;

		// Validate required fields
		const missingFields = [];
		if (!title) missingFields.push("title");
		if (!description) missingFields.push("description");
		if (!image) missingFields.push("image");
		if (!user) missingFields.push("user");

		if (missingFields.length) {
			return res.status(400).send({
				success: false,
				message: `Missing required fields: ${missingFields.join(", ")}`,
			});
		}

		// Fix 1: Add await when finding user
		const existingUser = await userModel.findById(user);
		if (!existingUser) {
			return res.status(404).send({
				success: false,
				message: "Unable to find user!",
			});
		}

		// Fix 2: Include user ID when creating new blog
		const newBlog = new blogModel({ title, description, image, user });

		const session = await mongoose.startSession();
		session.startTransaction(); // Fix 3: Start transaction explicitly

		try {
			await newBlog.save({ session });
			existingUser.blogs.push(newBlog);
			await existingUser.save({ session });
			await session.commitTransaction();

			return res.status(201).send({
				success: true,
				message: "Blog created successfully",
				blog: newBlog,
			});
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Failed to create blog",
			error: error.message,
		});
	}
};

const updateBlogController = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, image } = req.body;

		// Check if blog exists
		const existingBlog = await blogModel.findById(id);
		if (!existingBlog) {
			return res.status(404).send({
				success: false,
				message: "Blog not found",
			});
		}

		const updatedBlog = await blogModel.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);

		return res.status(200).send({
			success: true,
			message: "Blog updated successfully",
			blog: updatedBlog,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Failed to update blog",
			error: error.message,
		});
	}
};

const getBlogByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await blogModel.findById(id);

		if (!blog) {
			return res.status(404).send({
				success: false,
				message: "Blog not found",
			});
		}

		return res.status(200).send({
			success: true,
			message: "Blog retrieved successfully",
			blog,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Failed to retrieve blog",
			error: error.message,
		});
	}
};

const deleteBlogController = async (req, res) => {
	try {
		const { id } = req.params;

		// Find blog and populate user data in one query
		const blog = await blogModel.findById(id).populate("user");
		if (!blog) {
			return res.status(404).send({
				success: false,
				message: "Blog not found",
			});
		}

		// Start a session for transaction
		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			// Remove blog from user's blogs array
			await blog.user.blogs.pull(blog._id);
			await blog.user.save({ session });

			// Delete the blog
			await blog.deleteOne({ session });

			await session.commitTransaction();

			return res.status(200).send({
				success: true,
				message: "Blog deleted successfully",
				blogId: id,
			});
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Failed to delete blog",
			error: error.message,
		});
	}
};

const userBlogController = async (req, res) => {
	try {
		const userBlogs = await userModel.findById(req.params.id).populate({
			path: "blogs",
			populate: {
				path: "user",
				select: "username",
			},
		});
		if (!userBlogs) {
			return res.status(404).send({
				success: false,
				message: "Blogs not found with this id",
			});
		}
		return res.status(200).send({
			success: true,
			message: "user blogs",
			userBlogs,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({
			success: false,
			message: "Error in user blog",
			error: error.message,
		});
	}
};

export {
	getAllBlogsController,
	getBlogByIdController,
	createBlogController,
	updateBlogController,
	deleteBlogController,
	userBlogController,
};

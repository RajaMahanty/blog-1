import express from "express";
import {
	createBlogController,
	deleteBlogController,
	getAllBlogsController,
	getBlogByIdController,
	updateBlogController,
	userBlogController,
} from "../controllers/blogController.js";

// Router object
const blogRoutes = express.Router();

// Blog Routes
// GET || all blogs
blogRoutes.get("/all-blogs", getAllBlogsController);

// GET || get single blog
blogRoutes.get("/get-blog/:id", getBlogByIdController);

// POST || create blog
blogRoutes.post("/create-blog", createBlogController);

// PUT || update blog
blogRoutes.put("/update-blog/:id", updateBlogController);

// DELETE || delete blog
blogRoutes.delete("/delete-blog/:id", deleteBlogController);

// GET || user blog
blogRoutes.get("/user-blog/:id", userBlogController);

export default blogRoutes;

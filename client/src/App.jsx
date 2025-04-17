import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import axios from "axios";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBlog from "./components/CreateBlog";
import BlogDetails from "./pages/BlogDetails";

// Configuring base URL
axios.defaults.baseURL = "http://localhost:8080/api/v1";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Blogs />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/my-blogs" element={<UserBlogs />} />
				<Route path="/blog-details/:id" element={<BlogDetails />} />
				<Route path="/create-blog" element={<CreateBlog />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</>
	);
}

export default App;

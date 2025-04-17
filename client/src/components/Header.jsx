import React, { useState } from "react";
import {
	Box,
	AppBar,
	Toolbar,
	Button,
	Typography,
	Tabs,
	Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
	// global state
	const isLogin = useSelector((state) => state.isLogin);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	// state
	const [value, setValue] = useState();

	// handle logout
	const handleLogout = () => {
		try {
			dispatch(authActions.logout());
			localStorage.setItem("userID", undefined);
			toast.success("Logged out successfully!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
			});
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Typography>My Blog App</Typography>
					{isLogin && (
						<Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
							<Tabs
								textColor="inherit"
								value={value}
								onChange={(e, val) => setValue(val)}
							>
								<Tab label="Blogs" LinkComponent={Link} to="/blogs" />
								<Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
								<Tab
									label="Create Blog"
									LinkComponent={Link}
									to="/create-blog"
								/>
							</Tabs>
						</Box>
					)}
					<Box display={"flex"} marginLeft={"auto"}>
						{!isLogin && (
							<>
								<Button
									sx={{ margin: 1, color: "white" }}
									LinkComponent={Link}
									to="/login"
								>
									Login
								</Button>
								<Button
									sx={{ margin: 1, color: "white" }}
									LinkComponent={Link}
									to="/register"
								>
									Register
								</Button>
							</>
						)}
						{isLogin && (
							<Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
								Logout
							</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;

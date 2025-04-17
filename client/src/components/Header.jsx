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
			<AppBar
				position="sticky"
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
					py: 1,
				}}
			>
				<Toolbar>
					<Typography
						variant="h5"
						component="div"
						sx={{
							fontWeight: 700,
							color: "#1976d2",
							letterSpacing: "0.5px",
						}}
					>
						My Blog App
					</Typography>
					{isLogin && (
						<Box
							display={"flex"}
							marginLeft={"auto"}
							marginRight={"auto"}
							sx={{ gap: 2 }}
						>
							<Tabs
								textColor="primary"
								indicatorColor="primary"
								value={value}
								onChange={(e, val) => setValue(val)}
							>
								<Tab
									label="Blogs"
									LinkComponent={Link}
									to="/blogs"
									sx={{
										fontWeight: 600,
										textTransform: "none",
										fontSize: "1rem",
									}}
								/>
								<Tab
									label="My Blogs"
									LinkComponent={Link}
									to="/my-blogs"
									sx={{
										fontWeight: 600,
										textTransform: "none",
										fontSize: "1rem",
									}}
								/>
								<Tab
									label="Create Blog"
									LinkComponent={Link}
									to="/create-blog"
									sx={{
										fontWeight: 600,
										textTransform: "none",
										fontSize: "1rem",
									}}
								/>
							</Tabs>
						</Box>
					)}
					<Box display={"flex"} marginLeft={"auto"} sx={{ gap: 1 }}>
						{!isLogin && (
							<>
								<Button
									variant="outlined"
									sx={{
										margin: 1,
										color: "#1976d2",
										borderColor: "#1976d2",
										"&:hover": {
											backgroundColor: "#1976d2",
											color: "white",
											borderColor: "#1976d2",
										},
									}}
									LinkComponent={Link}
									to="/login"
								>
									Login
								</Button>
								<Button
									variant="contained"
									sx={{
										margin: 1,
										backgroundColor: "#1976d2",
										"&:hover": {
											backgroundColor: "#1565c0",
										},
									}}
									LinkComponent={Link}
									to="/register"
								>
									Register
								</Button>
							</>
						)}
						{isLogin && (
							<Button
								variant="outlined"
								onClick={handleLogout}
								sx={{
									margin: 1,
									color: "#d32f2f",
									borderColor: "#d32f2f",
									"&:hover": {
										backgroundColor: "#d32f2f",
										color: "white",
										borderColor: "#d32f2f",
									},
								}}
							>
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

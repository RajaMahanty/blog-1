import React, { useState } from "react";
import {
	Box,
	AppBar,
	Toolbar,
	Button,
	Typography,
	Tabs,
	Tab,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
	const [value, setValue] = useState(0);
	const [mobileOpen, setMobileOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography
				variant="h6"
				sx={{ my: 2, color: theme.palette.primary.main }}
			>
				Bleggar
			</Typography>
			<List>
				{isLogin && (
					<>
						<ListItem
							button
							component={Link}
							to="/blogs"
							onClick={() => setValue(0)}
						>
							<ListItemText primary="Blogs" />
						</ListItem>
						<ListItem
							button
							component={Link}
							to="/my-blogs"
							onClick={() => setValue(1)}
						>
							<ListItemText primary="My Blogs" />
						</ListItem>
						<ListItem
							button
							component={Link}
							to="/create-blog"
							onClick={() => setValue(2)}
						>
							<ListItemText primary="Create Blog" />
						</ListItem>
					</>
				)}
				{!isLogin && (
					<>
						<ListItem button component={Link} to="/login">
							<ListItemText primary="Login" />
						</ListItem>
						<ListItem button component={Link} to="/register">
							<ListItemText primary="Register" />
						</ListItem>
					</>
				)}
				{isLogin && (
					<ListItem button onClick={handleLogout}>
						<ListItemText primary="Logout" />
					</ListItem>
				)}
			</List>
		</Box>
	);

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
					<IconButton
						color="primary"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h5"
						component="div"
						sx={{
							fontWeight: 700,
							color: "#1976d2",
							letterSpacing: "0.5px",
							flexGrow: 1,
						}}
					>
						Bleggar
					</Typography>
					{isLogin && !isMobile && (
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
					{!isMobile && (
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
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="temporary"
				anchor="left"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 240,
					},
				}}
			>
				{drawer}
			</Drawer>
		</>
	);
};

export default Header;

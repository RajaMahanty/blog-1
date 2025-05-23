import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
	Box,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function BlogCard({
	title,
	description,
	image,
	username,
	createdAt,
	sx,
	id,
	isUser,
	onDelete,
}) {
	const navigate = useNavigate();
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const handleEdit = async () => {
		navigate(`/blog-details/${id}`);
	};

	const handleDelete = async () => {
		try {
			const { data } = await axios.delete(`/blogs/delete-blog/${id}`);
			if (data?.success) {
				toast.success("Blog deleted successfully!");
				onDelete(id); // Call the parent's onDelete callback to update the UI
			}
		} catch (error) {
			console.log(error);
			toast.error("Error deleting blog!");
		}
		setOpenDeleteDialog(false);
	};

	const handleDeleteClick = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					borderRadius: 2,
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
					transition: "all 0.3s ease",
					backgroundColor: "background.paper",
					height: "100%",
					"&:hover": {
						boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
						transform: "translateY(-4px)",
					},
					...sx,
				}}
			>
				<Box sx={{ position: "relative" }}>
					<CardMedia
						sx={{
							height: 200,
							objectFit: "cover",
							borderRadius: "12px 12px 0 0",
						}}
						component="img"
						image={image}
						alt="Blog image"
					/>
					{isUser && (
						<Box
							sx={{
								position: "absolute",
								top: 8,
								left: 8,
								display: "flex",
								gap: 1,
								backgroundColor: "rgba(255, 255, 255, 0.8)",
								borderRadius: 1,
								p: 0.5,
								transition: "all 0.2s ease",
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.95)",
									transform: "scale(1.05)",
								},
							}}
						>
							<IconButton
								onClick={handleEdit}
								size="small"
								sx={{
									transition: "all 0.2s ease",
									"&:hover": {
										color: "green",
									},
								}}
							>
								<ModeEditIcon fontSize="small" />
							</IconButton>
							<IconButton
								onClick={handleDeleteClick}
								size="small"
								sx={{
									transition: "all 0.2s ease",
									"&:hover": {
										color: "error.main",
									},
								}}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Box>
					)}
				</Box>
				<CardContent
					sx={{
						flexGrow: 1,
						p: 3,
						display: "flex",
						flexDirection: "column",
						height: "calc(100% - 200px)", // Subtract image height
					}}
				>
					<Typography
						variant="h6"
						component="h2"
						sx={{
							fontWeight: 700,
							mb: 2,
							color: "text.primary",
							lineHeight: 1.3,
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							minHeight: "3.2em", // 2 lines of text
						}}
					>
						{title}
					</Typography>
					<Typography
						variant="body2"
						sx={{
							color: "text.secondary",
							mb: 3,
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							lineHeight: 1.6,
							minHeight: "4.8em", // 3 lines of text
						}}
					>
						{description}
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mt: "auto",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Avatar
								sx={{
									bgcolor: red[500],
									width: 32,
									height: 32,
									fontSize: "1rem",
								}}
								aria-label="username"
							>
								{username ? username[0].toUpperCase() : "U"}
							</Avatar>
							<Typography
								variant="body2"
								sx={{ color: "text.secondary", fontWeight: 500 }}
							>
								{username}
							</Typography>
						</Box>
						<Typography
							variant="caption"
							sx={{ color: "text.secondary", fontWeight: 500 }}
						>
							{new Date(createdAt).toLocaleDateString(undefined, {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</Typography>
					</Box>
				</CardContent>
			</Card>

			<Dialog
				open={openDeleteDialog}
				onClose={handleCloseDeleteDialog}
				aria-labelledby="delete-dialog-title"
				aria-describedby="delete-dialog-description"
			>
				<DialogTitle id="delete-dialog-title">Delete Blog</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this blog? This action cannot be
						undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDelete} color="error" variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

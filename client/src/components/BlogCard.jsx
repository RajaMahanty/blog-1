import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function BlogCard({
	title,
	description,
	image,
	username,
	createdAt,
}) {
	return (
		<Card
			sx={{
				width: "80%",
				maxWidth: "800px",
				margin: "2rem auto",
				p: 3,
				borderRadius: "12px",
				boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
				transition: "transform 0.3s ease, box-shadow 0.3s ease",
				":hover": {
					transform: "translateY(-5px)",
					boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
				},
				backgroundColor: "#ffffff",
			}}
		>
			<CardHeader
				avatar={
					<Avatar
						sx={{
							bgcolor: red[500],
							width: 48,
							height: 48,
							fontSize: "1.2rem",
						}}
						aria-label="username"
					>
						{username ? username[0].toUpperCase() : "U"}
					</Avatar>
				}
				title={
					<Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
						{title}
					</Typography>
				}
				subheader={
					<Typography variant="subtitle2" color="text.secondary">
						{new Date(createdAt).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Typography>
				}
			/>
			<CardMedia
				sx={{
					objectFit: "cover",
					height: "300px",
					borderRadius: "8px",
					margin: "1rem 0",
				}}
				component="img"
				image={image}
				alt="Blog image"
			/>

			<CardContent>
				<Typography
					variant="body1"
					sx={{
						color: "text.secondary",
						lineHeight: 1.8,
						fontSize: "1.1rem",
					}}
				>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}

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
	console.log(username);
	return (
		<Card
			sx={{
				width: "40%",
				margin: "auto",
				mt: 2,
				p: 2,
				boxShadow: "5px 5px 10px #ccc",
				":hover": {
					boxShadow: "10px 10px 20px #ccc",
				},
			}}
		>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="username">
						{username ? username[0].toUpperCase() : "U"}
					</Avatar>
				}
				title={title}
				subheader={new Date(createdAt).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			/>
			<CardMedia
				sx={{ objectFit: "contain" }}
				component="img"
				height="194"
				image={image}
				alt="Blog image"
			/>

			<CardContent>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}

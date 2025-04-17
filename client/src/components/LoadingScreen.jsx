import React from "react";
import { Box, Typography } from "@mui/material";

const LoadingScreen = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(255, 255, 255, 0.9)",
				zIndex: 9999,
			}}
		>
			<Box
				sx={{
					width: 50,
					height: 50,
					border: "4px solid #f3f3f3",
					borderTop: "4px solid #3498db",
					borderRadius: "50%",
					animation: "spin 1s linear infinite",
					"@keyframes spin": {
						"0%": {
							transform: "rotate(0deg)",
						},
						"100%": {
							transform: "rotate(360deg)",
						},
					},
				}}
			/>
			<Typography
				variant="h6"
				sx={{
					mt: 2,
					color: "text.primary",
					fontWeight: 500,
				}}
			>
				Loading...
			</Typography>
		</Box>
	);
};

export default LoadingScreen;

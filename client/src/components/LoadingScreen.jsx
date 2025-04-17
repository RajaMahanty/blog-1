import React from "react";

const LoadingScreen = () => {
	return (
		<div
			style={{
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
			<div
				style={{
					width: 50,
					height: 50,
					position: "relative",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
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
				></div>
			</div>
			<p
				style={{
					marginTop: 20,
					fontSize: "1.2rem",
					color: "#333",
					fontWeight: 500,
				}}
			>
				Loading...
			</p>
		</div>
	);
};

export default LoadingScreen;

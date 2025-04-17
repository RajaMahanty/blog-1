import { createSlice, configureStore } from "@reduxjs/toolkit";

// Get initial state from localStorage
const getInitialState = () => {
	const storedAuth = localStorage.getItem("auth");
	return {
		isLogin: storedAuth ? JSON.parse(storedAuth).isLogin : false,
	};
};

const authSlice = createSlice({
	name: "Auth",
	initialState: getInitialState(),
	reducers: {
		login(state) {
			state.isLogin = true;
			localStorage.setItem("auth", JSON.stringify({ isLogin: true }));
		},
		logout(state) {
			state.isLogin = false;
			localStorage.removeItem("auth");
			localStorage.removeItem("userID");
		},
	},
});

export const authActions = authSlice.actions;

export const store = configureStore({
	reducer: authSlice.reducer,
});

import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quoteSlice";
import userReducer from "./userSlice";

export const store = configureStore({
	reducer: {
		quote: quoteReducer,
		user: userReducer,
	},
});

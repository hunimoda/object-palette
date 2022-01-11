import { configureStore } from "@reduxjs/toolkit";
import { ui } from "./ui";

const store = configureStore({
	reducer: {
		ui: ui.reducer,
	},
});

export default store;

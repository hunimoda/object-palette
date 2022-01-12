import { configureStore } from "@reduxjs/toolkit";
import { ui } from "./ui";
import { canvas } from "./canvas";

const store = configureStore({
	reducer: {
		ui: ui.reducer,
		canvas: canvas.reducer,
	},
});

export default store;

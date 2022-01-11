import { configureStore } from "@reduxjs/toolkit";
import { sample } from "./sample";

const store = configureStore({
	reducer: {
		sample: sample.reducer,
	},
});

export default store;

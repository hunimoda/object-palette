import { createSlice } from "@reduxjs/toolkit";

export const ui = createSlice({
	name: "ui",
	initialState: {
		isInventoryOpen: false,
	},
	reducers: {
		toggleInventory: (state) => {
			state.isInventoryOpen = !state.isInventoryOpen;
		},
	},
});

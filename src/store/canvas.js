import { createSlice } from "@reduxjs/toolkit";

export const canvas = createSlice({
	name: "canvas",
	initialState: {
		size: {
			width: 351,
			height: 506.391,
		},
		objects: [
			{
				src: "https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif",
				id: "abc123",
				aspectRatio: 498 / 364,
				width: 100,
				height: 73,
				top: 100,
				left: 100,
				rotate: 0,
			},
		],
	},
	reducers: {
		delete: (state, action) => {
			const { id } = action.payload; // payload: {id: ---, }

			state.objects = state.objects.filter((object) => object.id !== id);
		},
		resize: (state, action) => {
			const { id, left: touchLeft, top: touchTop } = action.payload;

			const currentObject = state.objects.find((object) => object.id === id);

			const deltaLeft = touchLeft - currentObject.left;
			const deltaTop = touchTop - currentObject.top;
			const diagonalLength = Math.sqrt(
				Math.pow(deltaLeft, 2) + Math.pow(deltaTop, 2)
			);

			const aspectRatio = currentObject.aspectRatio;
			const diagonalAngle = (Math.atan(1 / aspectRatio) * 180) / Math.PI;
			const diagonalRatio = Math.sqrt(Math.pow(aspectRatio, 2) + 1);

			currentObject.width = (diagonalLength * aspectRatio) / diagonalRatio;
			currentObject.height = diagonalLength / diagonalRatio;
			currentObject.rotate =
				diagonalAngle +
				((Math.acos(deltaLeft / diagonalLength) * 180) / Math.PI) *
					(deltaTop > 0 ? -1 : 1);
		},
		move: (state, action) => {
			const { id, deltaX, deltaY } = action.payload;
			const object = state.objects.find((object) => object.id === id);

			object.left += deltaX;
			object.top += deltaY;
		},
	},
});

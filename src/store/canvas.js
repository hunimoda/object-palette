import { createSlice } from "@reduxjs/toolkit";

export const canvas = createSlice({
	name: "canvas",
	initialState: {
		maxZIndex: 0,
		size: {
			width: 351,
			height: 506.391,
		},
		objects: [],
	},
	reducers: {
		add: (state, action) => {
			const { src, aspectRatio } = action.payload;

			const initWidth = 150;
			const initHeight = initWidth / aspectRatio;

			const canvasWidth = state.size.width;
			const canvasHeight = state.size.height;

			const newObject = {
				src,
				id: Math.random().toString() + src,
				aspectRatio,
				width: initWidth,
				height: initHeight,
				top: (canvasHeight - initHeight) / 2,
				left: (canvasWidth - initWidth) / 2,
				rotate: 0,
				isSelected: true,
				zIndex: ++state.maxZIndex,
			};

			canvas.caseReducers.deselectAll(state);
			state.objects.push(newObject);
		},
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
		select: (state, action) => {
			const { id } = action.payload;
			const object = state.objects.find((object) => object.id === id);

			if (!object.isSelected) {
				canvas.caseReducers.deselectAll(state);
				object.isSelected = true;
				object.zIndex = ++state.maxZIndex;
			}
		},
		deselectAll: (state) => {
			state.objects.forEach((object) => (object.isSelected = false));
		},
	},
});

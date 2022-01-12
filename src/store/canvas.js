import { createSlice, current } from "@reduxjs/toolkit";

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
			const { src, aspectRatio, type } = action.payload;

			const canvasWidth = state.size.width;
			const canvasHeight = state.size.height;

			let newObject;

			if (type === "image") {
				const initWidth = 150;
				const initHeight = initWidth / aspectRatio;

				newObject = {
					type,
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
			} else if (type === "text") {
				newObject = {
					type,
					id: Math.random().toString() + "simple-text",
					width: 200,
					height: 60,
					top: (canvasHeight - 60) / 2,
					left: (canvasWidth - 200) / 2,
					rotate: 0,
					isSelected: true,
					isTextEditMode: true,
					zIndex: ++state.maxZIndex,
				};
			}

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

			let newWidth;
			let newHeight;
			let newRotate;

			const deltaLeft = touchLeft - currentObject.left;
			const deltaTop = touchTop - currentObject.top;

			if (currentObject.type === "image") {
				const diagonalLength = Math.sqrt(
					Math.pow(deltaLeft, 2) + Math.pow(deltaTop, 2)
				);

				const aspectRatio = currentObject.aspectRatio;
				const diagonalAngle = (Math.atan(1 / aspectRatio) * 180) / Math.PI;
				const diagonalRatio = Math.sqrt(Math.pow(aspectRatio, 2) + 1);

				newWidth = (diagonalLength * aspectRatio) / diagonalRatio;
				newHeight = diagonalLength / diagonalRatio;
				newRotate =
					diagonalAngle +
					((Math.acos(deltaLeft / diagonalLength) * 180) / Math.PI) *
						(deltaTop > 0 ? -1 : 1);
			} else {
				newWidth = deltaLeft;
				newHeight = deltaTop;
				newRotate = 0;
			}

			currentObject.width = newWidth;
			currentObject.height = newHeight;
			currentObject.rotate = newRotate;
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
			} else if (object.type === "text") {
				object.isTextEditMode = true;
			}
		},
		deselectAll: (state) => {
			state.objects.forEach((object) => {
				object.isSelected = false;
				if (object.type === "text") {
					object.isTextEditMode = false;
				}
			});
		},
	},
});

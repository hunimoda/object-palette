import { useState } from "react";
import { useDispatch } from "react-redux";
import { canvas } from "../../store/canvas";
import classes from "./Object.module.css";

const Object = (props) => {
	const dispatch = useDispatch();

	const [isBeingModified, setIsBeingModified] = useState(false);
	const [isMoving, setIsMoving] = useState(false);
	const [touchPoint, setTouchPoint] = useState(null);
	const [isRotateMode, setIsRotateMode] = useState(false);

	const {
		type,
		id,
		src,
		width,
		height,
		top,
		left,
		rotate,
		isSelected,
		isTextEditMode,
		zIndex,
	} = props.object;

	const objectStyle = {
		width: `${width}px`,
		height: `${height}px`,
		top: `${top - 1}px`, // -1 for border
		left: `${left - 1}px`, // -1 for border
		transform: `rotate(${-rotate}deg)`,
		zIndex,
	};
	const contentStyle = {
		width: `${width}px`,
		height: `${height}px`,
	};

	const deleteObjectHandler = () => {
		if (isSelected) {
			dispatch(canvas.actions.delete({ id }));
		}
	};

	const startModifyHandler = () => {
		setIsBeingModified(true);
	};

	const modifyHandler = (event) => {
		if (isSelected && isBeingModified) {
			const { top: canvasTop, left: canvasLeft } = props
				.onGetCanvas()
				.getBoundingClientRect();
			const { clientX: left, clientY: top } = event.touches[0];

			const deltaLeft = left - canvasLeft;
			const deltaTop = top - canvasTop;

			dispatch(
				canvas.actions.resize({
					id,
					left: deltaLeft,
					top: deltaTop,
					isRotateMode,
				})
			);
		}
	};

	const endModifyHandler = () => {
		setIsBeingModified(false);
	};

	const toggleModifyModeHandler = (event) => {
		event.stopPropagation();
		setIsRotateMode((mode) => !mode);
	};

	const startMoveHandler = (event) => {
		const { clientX: x, clientY: y } = event.touches[0];

		setTouchPoint({ x, y });
		setIsMoving(true);
	};

	const moveHandler = (event) => {
		if (isSelected && isMoving) {
			const { clientX: x, clientY: y } = event.touches[0];
			const deltaX = x - touchPoint.x;
			const deltaY = y - touchPoint.y;

			dispatch(canvas.actions.move({ id, deltaX, deltaY }));
			setTouchPoint({ x, y });
		}
	};

	const endMoveHandler = () => {
		setIsMoving(false);
	};

	const selectHandler = (event) => {
		event.stopPropagation();
		dispatch(canvas.actions.select({ id }));
	};

	const objectClass = `${classes.object} ${
		!isSelected ? classes["object--deselected"] : ""
	}`;

	return (
		<div className={objectClass} style={objectStyle}>
			<div className={classes["origin"]} />
			<div className={classes["delete"]} onClick={deleteObjectHandler}>
				<i className="fas fa-times" />
			</div>
			<div
				className={classes["modify"]}
				onTouchStart={startModifyHandler}
				onTouchMove={modifyHandler}
				onTouchEnd={endModifyHandler}
				onClick={toggleModifyModeHandler}
			>
				{type === "image" ? (
					<i className={`fas fa-arrows-alt-h ${classes.slanted}`} />
				) : isRotateMode ? (
					<i class="fas fa-undo" />
				) : (
					<i className="fas fa-arrows-alt" />
				)}
			</div>
			{type === "image" && (
				<img
					src={src}
					style={contentStyle}
					alt="invalid"
					onTouchStart={startMoveHandler}
					onTouchMove={moveHandler}
					onTouchEnd={endMoveHandler}
					onClick={selectHandler}
				/>
			)}
			{type === "text" && (
				<textarea
					style={contentStyle}
					className={classes.text}
					onTouchStart={startMoveHandler}
					onTouchMove={moveHandler}
					onTouchEnd={endMoveHandler}
					onClick={selectHandler}
					placeholder="ABC"
					readOnly={!isTextEditMode}
					autoFocus
				></textarea>
			)}
		</div>
	);
};

export default Object;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { canvas } from "../../store/canvas";
import classes from "./Object.module.css";

const Object = (props) => {
	const dispatch = useDispatch();

	const [isBeingModified, setIsBeingModified] = useState(false);
	const [isMoving, setIsMoving] = useState(false);
	const [touchPoint, setTouchPoint] = useState(null);

	const { id, src, width, height, top, left, rotate, isSelected, zIndex } =
		props.object;

	const objectStyle = {
		width: `${width}px`,
		height: `${height}px`,
		top: `${top - 1}px`, // -1 for border
		left: `${left - 1}px`, // -1 for border
		transform: `rotate(${-rotate}deg)`,
		zIndex,
	};
	const imageStyle = {
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
				})
			);
		}
	};

	const endModifyHandler = () => {
		setIsBeingModified(false);
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
			>
				<i className="fas fa-arrows-alt-h" />
			</div>
			<img
				src={src}
				style={imageStyle}
				alt="invalid"
				className={classes.image}
				onTouchStart={startMoveHandler}
				onTouchMove={moveHandler}
				onTouchEnd={endMoveHandler}
				onClick={selectHandler}
			/>
		</div>
	);
};

export default Object;

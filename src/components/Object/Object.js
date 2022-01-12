import { useState } from "react";
import { useDispatch } from "react-redux";
import { canvas } from "../../store/canvas";
import classes from "./Object.module.css";

const Object = (props) => {
	const dispatch = useDispatch();

	const [isBeingModified, setIsBeingModified] = useState(false);

	const { id, src, width, height, top, left, rotate } = props.object;

	const objectStyle = {
		width: `${width}px`,
		height: `${height}px`,
		top: `${top - 1}px`, // -1 for border
		left: `${left - 1}px`, // -1 for border
		transform: `rotate(${-rotate}deg)`,
	};
	const imageStyle = {
		width: `${width}px`,
		height: `${height}px`,
	};

	const deleteObjectHandler = () => {
		dispatch(canvas.actions.delete({ id }));
	};

	const startModifyHandler = () => {
		setIsBeingModified(true);
		console.log("start");
	};

	const modifyHandler = (event) => {
		if (isBeingModified) {
			const {
				top: canvasTop,
				left: canvasLeft,
				width: canvasWidth,
				height: canvasHeight,
			} = props.onCanvasRequest();
			const { clientX: left, clientY: top } = event.touches[0];

			const deltaLeft = Math.max(0, Math.min(left - canvasLeft, canvasWidth));
			const deltaTop = Math.max(0, Math.min(top - canvasTop, canvasHeight));

			dispatch(canvas.actions.resize({ id, left: deltaLeft, top: deltaTop }));
		}
	};

	const endModifyHandler = () => {
		setIsBeingModified(false);
		console.log("end");
	};

	return (
		<div className={classes.object} style={objectStyle}>
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
			/>
		</div>
	);
};

export default Object;

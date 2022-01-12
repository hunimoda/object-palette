import { useRef } from "react";
import { useSelector } from "react-redux";
import Object from "../Object/Object";
import classes from "./Canvas.module.css";

const Canvas = (props) => {
	const canvasClass = `${classes.canvas} ${props.className}`;
	const canvasObjects = useSelector((state) => state.canvas.objects);

	const canvasRef = useRef();

	const getCanvasHandler = () => {
		return canvasRef.current;
	};

	return (
		<div className={canvasClass} ref={canvasRef}>
			{canvasObjects.map((object) => (
				<Object
					key={object.id}
					object={object}
					onGetCanvas={getCanvasHandler}
				/>
			))}
		</div>
	);
};

export default Canvas;

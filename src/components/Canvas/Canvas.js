import { useRef } from "react";
import { useSelector } from "react-redux";
import Object from "../Object/Object";
import classes from "./Canvas.module.css";

const Canvas = (props) => {
	const canvasClass = `${classes.canvas} ${props.className}`;
	const objects = useSelector((state) => state.canvas.objects);

	const canvasRef = useRef();

	const canvasRequestHandler = () => {
		return canvasRef.current.getBoundingClientRect();
	};

	return (
		<div className={canvasClass} ref={canvasRef}>
			{objects.map((object) => (
				<Object
					key={object.id}
					object={object}
					onCanvasRequest={canvasRequestHandler}
				/>
			))}
		</div>
	);
};

export default Canvas;

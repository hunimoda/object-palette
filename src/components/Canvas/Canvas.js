import classes from "./Canvas.module.css";

const Canvas = (props) => {
	const canvasClass = `${classes.canvas} ${props.className}`;

	return <div className={canvasClass}></div>;
};

export default Canvas;

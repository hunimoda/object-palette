import classes from "./Object.module.css";

const Object = (props) => {
	return (
		<div className={classes.object}>
			<div className={classes["origin"]} />
			<div className={classes["delete"]}>
				<i className="fas fa-times" />
			</div>
			<div className={classes["modify"]}>
				<i className="fas fa-arrows-alt-h" />
			</div>
			{/* {props.children} */}
			<img
				src="https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif"
				alt="test"
				className={classes["object-content"]}
			/>
		</div>
	);
};

export default Object;

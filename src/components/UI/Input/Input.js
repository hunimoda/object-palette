import classes from "./Input.module.css";

/**
 * @param	  {error, id, label, type, onChange, onBlur, value}	props
 * 		error			Error object {show, message}
 * 		id				ID for label and input
 * 		label			Label text
 * 		onChange	Input change handler
 * 		onBlur		Input blur handler
 * 		value			Input value
 */
const Input = (props) => {
	const showError = props.error.show;
	const controlClassName = `${classes["form-control"]} ${
		showError ? classes.invalid : ""
	}`;
	const errorMessage = showError && (
		<p className={classes["error-message"]}>{props.error.message}</p>
	);

	return (
		<div className={controlClassName}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				type={props.type ?? "text"}
				id={props.id}
				onChange={props.onChange}
				onBlur={props.onBlur}
				value={props.value}
			/>
			{errorMessage}
		</div>
	);
};

export default Input;

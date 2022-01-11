import { useState } from "react";

/**
 * @param   validate  The validation function supplied by the parent component
 * @returns
 */
export const useInput = (validate) => {
	const [value, setValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	/**
	 * The validation function should return an error message
	 * and the message is to be shown only if the input was touched.
	 * The parent component should first check the show status
	 * before rendering the message.
	 */
	const errorMessage = validate(value);
	const showErrorMessage = errorMessage && isTouched;

	const changeHandler = (event) => {
		setValue(event.target.value);
	};

	const blurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setValue("");
		setIsTouched(false);
	};

	return {
		value,
		error: {
			message: errorMessage,
			show: showErrorMessage,
		},
		changeHandler,
		blurHandler,
		reset,
	};
};

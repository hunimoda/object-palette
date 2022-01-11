import { useInput } from "../../hooks/use-input";
import Input from "../UI/Input/Input";

/*** Validate functions ******************************/
const validateFirstName = (firstName) => {
	if (firstName.trim().length === 0) {
		return "Empty value is not allowed.";
	}
	if (firstName.match(/[^a-z]/i) !== null) {
		return "Name should contain only alphabets.";
	}
	if (firstName.match(/^[A-Z]/) === null) {
		return "Name should start with a capital letter.";
	}
	return "";
};

const validateLastName = (lastName) => {
	return "";
};

const validateEmail = (email) => {
	if (email.trim().length === 0) {
		return "Empty value is not allowed.";
	}
	if (email.match(/[^a-z@.]/i) !== null) {
		return "Invalid character is included.";
	}
	if (email.match(/^[a-z]/i) === null) {
		return "Email should start with an alphabet.";
	}
	if (!email.includes("@")) {
		return "Email should include the '@' symbol.";
	}
	if (email.match(/\.[a-z]+$/i) === null) {
		return "Email address seems to be invalid.";
	}
	return "";
};
/******************************************************/

/**
 * Sample form using custom hook and UI (useInput & Input)
 *
 * @param {*} props
 * @returns
 */
const BasicForm = (props) => {
	// Custom hook useInput
	// Validate function is passed into useInput
	const {
		value: firstName,
		error: firstNameError,
		changeHandler: firstNameChangeHandler,
		blurHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput(validateFirstName);

	const {
		value: lastName,
		error: lastNameError,
		changeHandler: lastNameChangeHandler,
		blurHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput(validateLastName);

	const {
		value: email,
		error: emailError,
		changeHandler: emailChangeHandler,
		blurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(validateEmail);

	// Check if the overall form is valid
	const isFormValid =
		firstNameError.message === "" &&
		lastNameError.message === "" &&
		emailError.message === "";

	const submitHandler = (event) => {
		event.preventDefault(); // Don't refresh
		if (!isFormValid) {
			return; // Return if form is not valid
		}
		/*** Submit form here ***********************/
		console.log("First name : " + firstName);
		console.log("Last name  : " + lastName);
		console.log("Email      : " + email);
		/********************************************/

		// Reset all inputs
		resetFirstName();
		resetLastName();
		resetEmail();
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="control-group">
				<Input
					error={firstNameError}
					id="first-name"
					label="First Name"
					onChange={firstNameChangeHandler}
					onBlur={firstNameBlurHandler}
					value={firstName}
				/>
				<Input
					error={lastNameError}
					id="last-name"
					label="Last Name"
					onChange={lastNameChangeHandler}
					onBlur={lastNameBlurHandler}
					value={lastName}
				/>
			</div>
			<Input
				error={emailError}
				id="email"
				label="E-Mail Address"
				onChange={emailChangeHandler}
				onBlur={emailBlurHandler}
				value={email}
			/>
			<div className="form-actions">
				<button disabled={!isFormValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

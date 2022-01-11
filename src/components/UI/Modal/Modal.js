import { Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

/**
 * @param	  {show, onBackdropClick}	props
 * 		show		            Return the modal component if true, null otherwise.
 * 		onBackdropClick			Backdrop click event (optional)
 */
const Modal = (props) => {
	if (!props.show) {
		return null;
	}

	return createPortal(
		<Fragment>
			<div className={classes.backdrop} onClick={props.onBackdropClick} />
			<div className={classes.modal}>{props.children}</div>
		</Fragment>,
		document.getElementById("modal")
	);
};

export default Modal;

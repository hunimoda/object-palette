import { useDispatch } from "react-redux";
import { ui } from "../../store/ui";
import classes from "./Footer.module.css";

const Footer = (props) => {
	const dispatch = useDispatch();
	const footerClass = `${classes.footer} ${props.className}`;

	const openInventoryHandler = () => {
		dispatch(ui.actions.toggleInventory());
	};

	return (
		<footer className={footerClass}>
			<i className="far fa-grin-squint" onClick={openInventoryHandler} />
			<i className="fas fa-font" />
		</footer>
	);
};

export default Footer;

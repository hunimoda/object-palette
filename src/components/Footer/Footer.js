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
			<i className="far fa-images" onClick={openInventoryHandler} />
		</footer>
	);
};

export default Footer;

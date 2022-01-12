import { useDispatch } from "react-redux";
import { ui } from "../../store/ui";
import { canvas } from "../../store/canvas";
import classes from "./Footer.module.css";

const Footer = (props) => {
	const dispatch = useDispatch();
	const footerClass = `${classes.footer} ${props.className}`;

	const openTextEditorHandler = (event) => {
		event.stopPropagation();
		dispatch(canvas.actions.add({ type: "text" }));
	};

	const openInventoryHandler = () => {
		dispatch(ui.actions.toggleInventory());
	};

	return (
		<footer className={footerClass}>
			<i className="far fa-comment-alt" onClick={openTextEditorHandler} />
			<i className="far fa-images" onClick={openInventoryHandler} />
		</footer>
	);
};

export default Footer;

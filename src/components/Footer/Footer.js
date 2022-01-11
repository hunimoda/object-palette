import classes from "./Footer.module.css";

const Footer = (props) => {
	const footerClass = `${classes.footer} ${props.className}`;

	return (
		<footer className={footerClass}>
			<i className="far fa-grin-squint" />
			<i class="fas fa-font" />
		</footer>
	);
};

export default Footer;

import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { canvas } from "./store/canvas";
import Header from "./components/Header/Header";
import Canvas from "./components/Canvas/Canvas";
import Footer from "./components/Footer/Footer";
import Inventory from "./components/Inventory/Inventory";
import classes from "./App.module.css";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});
		window.addEventListener("click", (event) => {
			dispatch(canvas.actions.deselectAll());
		});
	}, [dispatch]);

	return (
		<Fragment>
			<Header />
			<Canvas className={classes.canvas} />
			<Footer className={classes.footer} />
			<Inventory />
		</Fragment>
	);
}

export default App;

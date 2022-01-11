import { Fragment } from "react";
import Header from "./components/Header/Header";
import Canvas from "./components/Canvas/Canvas";
import Footer from "./components/Footer/Footer";
import Inventory from "./components/Inventory/Inventory";
import classes from "./App.module.css";

function App() {
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

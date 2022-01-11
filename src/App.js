import { Fragment } from "react";
import Header from "./components/Header/Header";
import Canvas from "./components/Canvas/Canvas";
import classes from "./App.module.css";

function App() {
	return (
		<Fragment>
			<Header />
			<Canvas className={classes.canvas} />
		</Fragment>
	);
}

export default App;

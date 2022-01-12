import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../../store/ui";
import { canvas } from "../../store/canvas";
import classes from "./Inventory.module.css";

const images = [
	"https://c.tenor.com/mjpJL6EZBPEAAAAM/goodbye-homer.gif",
	"https://i.giphy.com/media/RtdRhc7TxBxB0YAsK6/giphy.webp",
	"https://predictivehacks.com/wp-content/uploads/2020/11/mygif-1.gif",
	"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif",
	"https://payload.cargocollective.com/1/22/708406/14158876/ALI.gif",
	"https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif",
	"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1abfa455389655.59822ff82373e.gif",
	"https://c.tenor.com/U45Q8YaJzBUAAAAC/moti-hearts.gif",
];

const Inventory = () => {
	const dispatch = useDispatch();
	const closeInventoryHandler = () => {
		dispatch(ui.actions.toggleInventory());
	};

	const isOpen = useSelector((state) => state.ui.isInventoryOpen);
	const inventoryPopupClass = `${classes.inventory} ${
		isOpen ? classes["inventory--open"] : ""
	}`;

	const [showBoxShadow, setShowBoxShadow] = useState(false);
	const exitbarClass = `${classes.exit} ${
		showBoxShadow ? classes["exit--shadow"] : ""
	}`;

	const inventoryScrollHandler = (event) => {
		const top = event.target.scrollTop;

		if (top > 5 && !showBoxShadow) {
			setShowBoxShadow(true);
		} else if (top <= 5 && showBoxShadow) {
			setShowBoxShadow(false);
		}
	};

	const addImageToCanvasHandler = (event) => {
		const aspectRatio = event.target.naturalWidth / event.target.naturalHeight;

		dispatch(canvas.actions.add({ src: event.target.src, aspectRatio }));
	};

	return (
		<Fragment>
			{isOpen && (
				<div className={classes.backdrop} onClick={closeInventoryHandler} />
			)}
			<div className={inventoryPopupClass}>
				<div className={exitbarClass}>
					<i className="fas fa-times" onClick={closeInventoryHandler} />
				</div>
				<div className={classes.items} onScroll={inventoryScrollHandler}>
					{images.map((src) => (
						<div className={classes["img-container"]} key={`container::${src}`}>
							<img src={src} alt="invalid" onClick={addImageToCanvasHandler} />
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default Inventory;

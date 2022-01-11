import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../../store/ui";
import classes from "./Inventory.module.css";

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
					<div className={classes["items-row"]}>
						<div className={classes["img-container"]}>
							<img
								src="https://c.tenor.com/mjpJL6EZBPEAAAAM/goodbye-homer.gif"
								alt="1"
							/>
						</div>
						<div className={classes["img-container"]}>
							<img
								src="https://i.giphy.com/media/RtdRhc7TxBxB0YAsK6/giphy.webp"
								alt="2"
							/>
						</div>
						<div className={classes["img-container"]}>
							<img
								src="https://predictivehacks.com/wp-content/uploads/2020/11/mygif-1.gif"
								alt="3"
							/>
						</div>
					</div>
					<div className={classes["items-row"]}>
						<div className={classes["img-container"]}>
							<img
								src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
								alt="4"
							/>
						</div>
						<div className={classes["img-container"]}>
							<img
								src="https://payload.cargocollective.com/1/22/708406/14158876/ALI.gif"
								alt="5"
							/>
						</div>
						<div className={classes["img-container"]}>
							<img
								src="https://c.tenor.com/lmA7VALYIAsAAAAC/sad-pikachu.gif"
								alt="6"
							/>
						</div>
					</div>
					<div className={classes["items-row"]}>
						<div className={classes["img-container"]}>
							<img
								src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1abfa455389655.59822ff82373e.gif"
								alt="7"
							/>
						</div>
						<div className={classes["img-container"]}>
							<img
								src="https://c.tenor.com/U45Q8YaJzBUAAAAC/moti-hearts.gif"
								alt="8"
							/>
						</div>
					</div>
					<div className={classes["items-row"]}></div>
				</div>
			</div>
		</Fragment>
	);
};

export default Inventory;

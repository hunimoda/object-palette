import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../../store/ui";
import classes from "./Inventory.module.css";

const Inventory = () => {
	const dispatch = useDispatch();
	const closeInventoryHandler = () => {
		dispatch(ui.actions.toggleInventory());
	};

	const isOpen = useSelector((state) => state.ui.isInventoryOpen);
	const inventoryClass = `${classes.inventory} ${
		isOpen ? classes["inventory--open"] : ""
	}`;

	return (
		<Fragment>
			{isOpen && (
				<div className={classes.backdrop} onClick={closeInventoryHandler} />
			)}
			<div className={inventoryClass}>
				<div className={classes.exit} onClick={closeInventoryHandler}>
					<i className="fas fa-times" />
				</div>
			</div>
		</Fragment>
	);
};

export default Inventory;

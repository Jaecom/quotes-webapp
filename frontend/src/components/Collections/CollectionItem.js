import classes from "./CollectionItem.module.scss";

const CollectionItem = (props) => {
	return (
		<div className={classes.wrapper}>
			<h3 className={classes.name}>{props.name}</h3>
		</div>
	);
};

export default CollectionItem;

import classes from "./CollectionItem.module.scss";

const CollectionItem = (props) => {
	return (
		<div className={classes.wrapper}>
			<h3 className="heading-3">{props.name}</h3>
		</div>
	);
};

export default CollectionItem;

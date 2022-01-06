import classes from "./CollectionItem.module.scss";

const CollectionItem = (props) => {
	const { collection } = props;
	return (
			<div className={classes["grid-item"]}>
				<div className={classes["grid-content"]}>
					<div className={classes.wrapper}>
						<h3 className="heading-3">{collection.name}</h3>
					</div>
				</div>
			</div>
	);
};

export default CollectionItem;

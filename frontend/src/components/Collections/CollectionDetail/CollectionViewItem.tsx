import React from "react";
import classes from "./CollectionViewItem.module.scss";

const CollectionViewItem = (props: { quote: { source: string; image: string } }) => {
	const { quote } = props;

	const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div className={classes.item} onClick={onClickHandler}>
			<div className={classes.content}>
				<img src={quote.image} className={classes.image} alt="quote" loading="lazy" />
			</div>
		</div>
	);
};

export default CollectionViewItem;

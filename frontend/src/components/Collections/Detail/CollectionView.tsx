import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import classes from "./CollectionView.module.scss";
import sprite from "../../../assets/sprite.svg";
import CollectionViewItem from "./CollectionViewItem";

const CollectionView = (props: { onClose: () => void }) => {
	const [sendRequest] = useHttp();

	const [collection, setCollection] =
		useState<{ quotes: { id: string; source: string; image: string }[] }>();

	const { collectionId } = useParams<{ collectionId: string }>();

	const viewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		sendRequest(
			{
				url: `/api/collections/${collectionId}`,
				method: "GET",
				credentials: "include",
			},
			(data) => {
				setCollection(data);
			}
		);
	}, [sendRequest, collectionId]);

	const nextHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		console.log("Next quote");
	};

	const previousHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		console.log("Previous quote");
	};

	const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (!viewRef.current) {
			return;
		}

		const view = viewRef.current;
		const viewScrollPosition = viewRef.current!.scrollLeft;

		view.scrollTo({
			top: 0,
			left: viewScrollPosition + e.deltaY * 0.4,
		});
	};

	return (
		<div className={classes.wrapper} onClick={props.onClose}>
			<div className={classes.view} ref={viewRef}>
				<div className={classes["view-content"]} onWheel={onWheel}>
					{collection?.quotes.map((quote) => (
						<CollectionViewItem quote={quote} key={quote.id} />
					))}
				</div>
			</div>
			<div className={`${classes.control} ${classes["arrow--right"]}`} onClick={nextHandler}>
				<svg className={classes.arrow}>
					<use href={sprite + "#icon-arrow-right"} />
				</svg>
			</div>
			<div className={`${classes.control} ${classes["arrow--left"]}`} onClick={previousHandler}>
				<svg className={classes.arrow}>
					<use href={sprite + "#icon-arrow-left"} />
				</svg>
			</div>
		</div>
	);
};

export default CollectionView;

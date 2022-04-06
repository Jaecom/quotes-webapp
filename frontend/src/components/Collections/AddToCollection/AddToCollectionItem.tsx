import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import classes from "./AddToCollectionItem.module.scss";
import sprite from "../../../assets/sprite.svg";
import { useDispatch } from "react-redux";
import { addQuoteToCollection, removeQuoteFromCollection } from "../../../store/userSlice";
import type { Collection } from "data-type";

interface Props {
	collection: Collection;
	quoteId: string;
}

const AddToCollectionItem = ({ collection, quoteId }: Props) => {
	const dispatch = useDispatch();
	const [isQuoteIncluded, setisQuoteIncluded] = useState<boolean>(
		collection.quotes.includes(quoteId)
	);
	const [sendRequest, isLoading] = useHttp();

	useEffect(() => {
		setisQuoteIncluded(collection.quotes.includes(quoteId));
	}, [collection, quoteId]);

	const addToCollectionHandler = () => {
		//prevent stacking requests
		if (isLoading) return;

		const method = isQuoteIncluded ? "DELETE" : "POST";

		sendRequest(
			{
				url: `/api/collections/${collection._id}/quotes`,
				method: method,
				body: JSON.stringify({ quoteId }),
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			},
			() => {
				setisQuoteIncluded((state) => !state);

				dispatch(
					method === "DELETE"
						? removeQuoteFromCollection({ quoteId, collectionId: collection._id })
						: addQuoteToCollection({ quoteId, collectionId: collection._id })
				);
			}
		);
	};

	const loadingClass = isLoading
		? isQuoteIncluded
			? classes["loading--remove"]
			: classes["loading--add"]
		: "";

	const loadingText = isLoading
		? isQuoteIncluded
			? "Removing..."
			: "Adding..."
		: isQuoteIncluded
		? "Added"
		: "";

	return (
		<li
			className={`${classes.item} ${isQuoteIncluded && classes["item--included"]} ${loadingClass}`}
			key={collection._id}
			onClick={addToCollectionHandler}
		>
			<div className={classes.content}>
				<div>
					<div className={classes["heading-container"]}>
						<h3 className={`${classes.name}`}>{collection.name}</h3>
						{collection.isPrivate && (
							<svg className={classes.lock}>
								<use href={sprite + "#icon-lock"} />
							</svg>
						)}
					</div>
					{collection.description && (
						<p className={`heading-5 ${classes.description}`}>{collection.description}</p>
					)}
				</div>
				<div className={classes.notification}>
					<svg className={classes.checkmark}>
						<use href={sprite + "#icon-check"} />
					</svg>
					<p>{loadingText}</p>
				</div>
			</div>
		</li>
	);
};

export default AddToCollectionItem;

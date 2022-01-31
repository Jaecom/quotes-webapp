import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import classes from "./AddToCollectionItem.module.scss";
import sprite from "../../../assets/sprite.svg";

interface Props {
	collection: collection;
	quoteId: string;
}

const AddToCollectionItem = ({ collection, quoteId }: Props) => {
	const [isQuoteIncluded, setisQuoteIncluded] = useState<boolean>(
		collection.quotes.includes(quoteId)
	);
	const [sendRequest] = useHttp();

	useEffect(() => {
		setisQuoteIncluded(collection.quotes.includes(quoteId));
	}, [collection, quoteId]);

	const addToCollectionHandler = () => {
		const method = isQuoteIncluded ? "DELETE" : "POST";

		sendRequest(
			{
				url: `http://localhost:5000/api/collections/${collection._id}/quotes`,
				method: method,
				body: JSON.stringify({ quoteId }),
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			},
			() => {
				setisQuoteIncluded((state) => !state);
			}
		);
	};

	return (
		<li
			className={`${classes.item} ${isQuoteIncluded && classes["item--included"]}`}
			key={collection._id}
			onClick={addToCollectionHandler}
		>
			<div className={classes.content}>
				<div>
					<div className={classes.heading}>
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
					<p>Added</p>
				</div>
			</div>
		</li>
	);
};

export default AddToCollectionItem;

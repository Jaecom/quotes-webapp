import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import classes from "./AddToCollectionItem.module.scss";
import sprite from "../../../assets/sprite.svg";

const AddToCollectionItem = (props) => {
	const { collection, quoteId } = props;
	const [isQuoteIncluded, setisQuoteIncluded] = useState(collection.quotes.includes(quoteId));
	const [sendRequest] = useHttp();

	useEffect(() => {
		setisQuoteIncluded(collection.quotes.includes(quoteId));
	}, [collection, quoteId]);

	const addToCollectionHandler = () => {
		const method = isQuoteIncluded ? "DELETE" : "POST";

		sendRequest(
			{
				url: `http://localhost:5000/api/collections/${collection._id}`,
				method: method,
				body: JSON.stringify({ quoteId }),
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			},
			(data) => {
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
					<div>
						<svg className={classes.checkmark}>
							<use href={sprite + "#icon-check"} />
						</svg>
						<p>Added</p>
					</div>
				</div>
			</div>
		</li>
	);
};

export default AddToCollectionItem;

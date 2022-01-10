import classes from "./AddToCollectionList.module.scss";
import Button from "../../UI/Button";
import AddToCollectionItem from "./AddToCollectionItem";

const AddToCollectionList = (props: {
	collections: { _id: string; name: string }[];
	quoteId: string;
	onClose: () => void;
	openCreatePage: () => void;
}) => {
	const { collections, quoteId } = props;

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.heading}>Add to Collection</h2>
			{collections.length === 0 && (
				<p className={`heading-4 ${classes.message}`}>You currently have no collections.</p>
			)}
			<ul className={classes.list}>
				{collections.length > 0 &&
					collections.map((collection) => (
						<AddToCollectionItem key={collection._id} collection={collection} quoteId={quoteId} />
					))}
			</ul>
			<div className={classes.buttons}>
				<Button fill onClick={props.onClose}>
					Done
				</Button>
				<Button outline onClick={props.openCreatePage}>
					Create Collection
				</Button>
			</div>
		</div>
	);
};

export default AddToCollectionList;

import classes from "./AddToCollectionList.module.scss";
import Button from "../../UI/Button";
import AddToCollectionItem from "./AddToCollectionItem";

const AddToCollectionList = (props: {
	collections: [{ _id: String }] | undefined;
	quoteId: String;
	onClose: () => void;
	openCreatePage: () => void;
}) => {
	const { collections, quoteId } = props;

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.heading}>Add to Collection</h2>
			<ul className={classes.list}>
				{collections &&
					collections.map((collection) => (
						<AddToCollectionItem key={collection._id} collection={collection} quoteId={quoteId} />
					))}
			</ul>
			<div className={classes.buttons}>
				<Button highlight onClick={props.onClose}>
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

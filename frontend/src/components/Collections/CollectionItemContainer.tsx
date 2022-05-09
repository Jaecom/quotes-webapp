import CollectionItem from "./CollectionItem";
import type { Collection } from "data-type";

interface Props {
	collection: Collection;
	onOptionsClick: (e: React.MouseEvent, collectionId: string) => void;
	onOptionBlur: () => void;
}

const CollectionItemContainer = (props: Props) => {
	const { collection, onOptionsClick, onOptionBlur } = props;

	return (
		<>
			<CollectionItem
				collection={collection}
				key={collection._id}
				onOptionsClick={onOptionsClick}
				onOptionBlur={onOptionBlur}
			/>
		</>
	);
};

export default CollectionItemContainer;

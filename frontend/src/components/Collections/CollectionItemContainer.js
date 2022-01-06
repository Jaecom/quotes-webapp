import CollectionItem from "./CollectionItem";

const CollectionItemContainer = (props) => {
	const { collection } = props;

	return <CollectionItem collection={collection} />;
};

export default CollectionItemContainer;

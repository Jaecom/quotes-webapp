import CollectionItem from "./CollectionItem";

const CollectionItemContainer = (props) => {
	const { collection } = props;

	return <CollectionItem collection={collection} key={collection._id} />;
};

export default CollectionItemContainer;

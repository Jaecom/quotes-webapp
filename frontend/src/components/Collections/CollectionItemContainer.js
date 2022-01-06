import CollectionItem from "./CollectionItem";

const CollectionItemContainer = (props) => {
	const { collection } = props;

	return <CollectionItem name={collection.name} description={collection.description} />;
};

export default CollectionItemContainer;

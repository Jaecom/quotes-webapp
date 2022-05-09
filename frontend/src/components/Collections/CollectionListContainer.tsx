import { useSelector } from "react-redux";
import CollectionList from "./CollectionList";
import useModal from "hooks/useModal";
import CreateCollectionModal from "./Form/CreateCollectionModal";

const CollectionListContainer = () => {
	const { collections } = useSelector((state: any) => state.user);
	const [isCreateOpen, openCreate, closeCreate] = useModal();

	return (
		<>
			<CollectionList collections={collections} openCreate={openCreate} />
			{isCreateOpen && <CreateCollectionModal onClose={closeCreate} />}
		</>
	);
};

export default CollectionListContainer;

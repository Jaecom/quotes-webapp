import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../store/userSlice";
import CollectionList from "./CollectionList";

const CollectionListContainer = () => {
	const { collections } = useSelector((state) => state.user);
	const [closeAfterCreate, setCloseAfterCreate] = useState(false);
	const dispatch = useDispatch();

	const createCollectionHandler = (data) => {
		console.log(data);
		dispatch(createCollection(data));
		//trigger rerender collectionList to close modal
		setCloseAfterCreate((state) => !state);
	};

	return (
		<>
			<CollectionList
				collections={collections}
				onCreateCollection={createCollectionHandler}
				closeAfterCreate={closeAfterCreate}
			/>
		</>
	);
};

export default CollectionListContainer;

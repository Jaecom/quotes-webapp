import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../store/userSlice";
import CollectionList from "./CollectionList";

const CollectionListContainer = () => {
	const { collections } = useSelector((state) => state.user);
	const [closeAfterCreate, setCloseAfterCreate] = useState(false);
	const dispatch = useDispatch();

	const createCollectionHandler = (data) => {
		console.log(data);
		dispatch(addCollection(data));
		//trigger rerender collectionList to close modal
		setCloseAfterCreate((state) => !state);
	};

	return (
		<>
			{collections && (
				<CollectionList
					collections={collections}
					onAddCollection={addCollectionHandler}
					closeAfterCreate={closeAfterCreate}
				/>
			)}
		</>
	);
};

export default CollectionListContainer;

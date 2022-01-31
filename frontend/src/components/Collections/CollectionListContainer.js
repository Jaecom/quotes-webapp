import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import CollectionList from "./CollectionList";

const CollectionListContainer = () => {
	const [sendRequest] = useHttp();
	const [collections, setCollections] = useState([]);
	const [closeAfterCreate, setCloseAfterCreate] = useState(false);

	const addCollectionHandler = (data) => {
		setCollections((state) => state.concat(data));
		//trigger rerender collectionList to close modal
		setCloseAfterCreate((state) => !state);
	};

	useEffect(() => {
		sendRequest(
			{
				url: "/api/collections",
				method: "GET",
				credentials: "include",
			},
			(data) => {
				setCollections(data);
			}
		);
	}, [sendRequest]);

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

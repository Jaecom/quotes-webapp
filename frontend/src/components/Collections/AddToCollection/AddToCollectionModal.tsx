import { useCallback, useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";

import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import CreateCollectionForm from "../Create/CreateCollectionForm";
import AddToCollectionList from "./AddToCollectionList";

interface Props {
	quoteId: string;
	onClose: () => void;
}

enum pageType {
	ADD_QUOTE,
	CREATE_COLLECTION,
}

const AddToCollectionModal = ({ quoteId, onClose }: Props) => {
	const [collections, setCollections] = useState<Collection[]>([]);
	const [page, setPage] = useState<pageType>(pageType.ADD_QUOTE);
	const [isCollectionCreated, setIsCollectionCreated] = useState<boolean>(false);

	const [sendRequest] = useHttp();

	useEffect(() => {
		if (page === pageType.CREATE_COLLECTION) {
			return;
		}

		sendRequest(
			{
				url: "/api/collections",
				method: "GET",
				credentials: "include",
			},
			(data: Collection[]) => {
				setCollections(data);
			}
		);
	}, [sendRequest, page]);

	const openCreatePage = () => {
		setPage(pageType.CREATE_COLLECTION);
	};

	const openAddToPage = useCallback(() => {
		setPage(pageType.ADD_QUOTE);
	}, []);

	const createCollectionHandler = () => {
		setIsCollectionCreated(true);
	};

	useEffect(() => {
		if (isCollectionCreated) {
			openAddToPage();
		}

		return () => {
			setIsCollectionCreated(false);
		};
	}, [isCollectionCreated, openAddToPage]);

	return (
		<Modal onClose={onClose} center top>
			<Card>
				{page === pageType.ADD_QUOTE && (
					<AddToCollectionList
						collections={collections}
						quoteId={quoteId}
						onClose={onClose}
						openCreatePage={openCreatePage}
					/>
				)}
				{page === pageType.CREATE_COLLECTION && (
					<CreateCollectionForm
						onAddCollection={createCollectionHandler}
						onCancel={openAddToPage}
					/>
				)}
			</Card>
		</Modal>
	);
};

export default AddToCollectionModal;

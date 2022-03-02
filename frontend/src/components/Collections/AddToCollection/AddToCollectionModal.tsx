import { useCallback, useEffect, useState } from "react";

import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import CreateCollectionForm from "../Create/CreateCollectionForm";
import AddToCollectionList from "./AddToCollectionList";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../../store/userSlice";

interface Props {
	quoteId: string;
	onClose: () => void;
}

enum pageType {
	ADD_QUOTE,
	CREATE_COLLECTION,
}

const AddToCollectionModal = ({ quoteId, onClose }: Props) => {
	const [page, setPage] = useState<pageType>(pageType.ADD_QUOTE);
	const [isCollectionCreated, setIsCollectionCreated] = useState<boolean>(false);
	const { collections } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();

	const openCreatePage = () => {
		setPage(pageType.CREATE_COLLECTION);
	};

	const openAddToPage = useCallback(() => {
		setPage(pageType.ADD_QUOTE);
	}, []);

	const createCollectionHandler = (data: Collection) => {
		dispatch(addCollection(data));
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

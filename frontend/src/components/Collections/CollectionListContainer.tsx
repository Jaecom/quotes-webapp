import { useSelector } from "react-redux";
import CollectionList from "./CollectionList";
import useModal from "hooks/useModal";
import Modal from "components/UI/Modal";
import Card from "components/UI/Card";
import CreateCollectionForm from "./Form/CreateCollectionContainer";
import EditCollectionContainer from "./Form/EditCollectionContainer";
import { useState } from "react";

const CollectionListContainer = () => {
	const { collections } = useSelector((state: any) => state.user);
	const [isCreateOpen, openCreate, closeCreate] = useModal();
	const [isEditOpen, openEdit, closeEdit] = useModal();
	const [collectionId, setCollectionId] = useState("");

	const editClickHandler = (collectionId: string) => {
		setCollectionId(collectionId);
		openEdit();
	};

	const deleteClickHandler = (collectionId: string) => {};

	return (
		<>
			<CollectionList
				collections={collections}
				openCreate={openCreate}
				onEditClick={editClickHandler}
			/>

			{isCreateOpen && (
				<Modal onClose={closeCreate} center>
					<Card>
						<CreateCollectionForm onClose={closeCreate} />
					</Card>
				</Modal>
			)}

			{isEditOpen && (
				<Modal onClose={closeEdit} center>
					<Card>
						<EditCollectionContainer
							onClose={closeEdit}
							collectionId={collectionId}
						/>
					</Card>
				</Modal>
			)}
		</>
	);
};

export default CollectionListContainer;

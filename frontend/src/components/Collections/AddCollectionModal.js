import AddCollectionForm from "./AddCollectionForm";
import Modal from "../UI/Modal";
import Card from "../UI/Card";

const AddCollectionModal = (props) => {
	return (
		<Modal onClose={props.onClose} center>
			<Card>
				<AddCollectionForm onCancel={props.onClose} onAddCollection={props.onAddCollection} />
			</Card>
		</Modal>
	);
};

export default AddCollectionModal;

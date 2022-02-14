import CreateCollectionForm from "./CreateCollectionForm";
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";

const CreateCollectionModal = (props) => {
	return (
		<Modal onClose={props.onClose} center>
			<Card>
				<CreateCollectionForm onCancel={props.onClose} onAddCollection={props.onAddCollection} />
			</Card>
		</Modal>
	);
};

export default CreateCollectionModal;

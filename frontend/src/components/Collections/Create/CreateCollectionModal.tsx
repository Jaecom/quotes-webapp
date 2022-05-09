import CreateCollectionForm from "./CreateCollectionForm";
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import { Collection } from "data-type";

interface Props {
	onClose: () => void;
	onCreateCollection: (data: Collection) => void;
}

const CreateCollectionModal = (props: Props) => {
	return (
		<Modal onClose={props.onClose} center>
			<Card>
				<CreateCollectionForm
					onCancel={props.onClose}
					onCreateCollection={props.onCreateCollection}
				/>
			</Card>
		</Modal>
	);
};

export default CreateCollectionModal;

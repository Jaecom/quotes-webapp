import CreateCollectionForm from "./CreateCollectionContainer";
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import { Collection } from "data-type";

interface Props {
	onClose: () => void;
}

const CreateCollectionModal = (props: Props) => {
	return (
		<Modal onClose={props.onClose} center>
			<Card>
				<CreateCollectionForm onClose={props.onClose} />
			</Card>
		</Modal>
	);
};

export default CreateCollectionModal;

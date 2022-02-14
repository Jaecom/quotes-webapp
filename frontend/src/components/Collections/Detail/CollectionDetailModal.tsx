import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal";
import CollectionView from "./CollectionView";

const CollectionDetailModal = () => {
	const history = useHistory();

	const modalCloseHander = () => {
		return history.push("/collections");
	};

	return (
		<Modal center onClose={modalCloseHander}>
			<CollectionView onClose={modalCloseHander} />
		</Modal>
	);
};

export default CollectionDetailModal;

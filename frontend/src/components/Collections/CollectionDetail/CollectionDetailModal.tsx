import { useHistory, RouteComponentProps } from "react-router-dom";
import Modal from "../../UI/Modal";
import CollectionView from "./CollectionView";

interface backgroundHistory extends RouteComponentProps {
	background: string;
}

const CollectionDetailModal = () => {
	const history = useHistory<backgroundHistory>();

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

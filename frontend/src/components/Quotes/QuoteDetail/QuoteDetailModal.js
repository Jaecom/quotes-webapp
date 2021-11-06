import { useEffect } from "react";
import { useHistory } from "react-router";
import Modal from "../../UI/Modal";
import classes from "./QuoteDetailModal.module.scss";

const QuoteDetailModal = (props) => {
	const history = useHistory();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	});

	const modalCloseHander = () => {
		history.goBack();
	};

	return (
		<Modal onClose={modalCloseHander}>
			<div className={classes.background}>{props.children}</div>
		</Modal>
	);
};

export default QuoteDetailModal;

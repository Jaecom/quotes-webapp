import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Modal from "../../UI/Modal";
import classes from "./QuoteDetailModal.module.scss";

const QuoteDetailModal = (props) => {
	const history = useHistory();
	const quoteModalRef = useRef();
	console.log("QuoteDetailModal");

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	});

	useEffect(() => {
		const unlisten = history.listen(() => {
			quoteModalRef.current?.scrollTo(0, 0);
		});

		return () => {
			unlisten();
		};
	}, [history]);

	const modalCloseHander = () => {
		const background = history.location.state.background;

		if (background.search !== "") {
			const backgroundLocation = background.pathname + background.search;
			return history.push(backgroundLocation);
		}

		return history.push("/");
	};

	return (
		<Modal onClose={modalCloseHander}>
			<div className={classes.background} ref={quoteModalRef}>
				{props.children}
			</div>
		</Modal>
	);
};

export default QuoteDetailModal;

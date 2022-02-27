import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal";
import classes from "./QuoteDetailModal.module.scss";

interface CustomHistory {
	background?: Location;
	noLoad?: boolean;
}

const QuoteDetailModal = (props: { children: React.ReactChildren }) => {
	const history = useHistory<CustomHistory>();
	const quoteModalRef = useRef<HTMLDivElement>(null);
	console.log("QuoteDetailModal");

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
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
		const background = history.location.state?.background;
		if (background) {
			return history.push(background.pathname + background.search, { noLoad: true });
		} else {
			return history.push("/");
		}
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

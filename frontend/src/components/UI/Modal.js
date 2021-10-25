import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";
import React from "react";

const Backdrop = (props) => {
	return (
		<div className={classes.backdrop} onClick={props.onClose}>
			{props.children}
		</div>
	);
};

const ModalOverlay = (props) => {
	return <div className={classes.overlay}>{props.children}</div>;
};

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				document.getElementById("backdrop")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				document.getElementById("modal")
			)}
		</>
	);
};

export default Modal;

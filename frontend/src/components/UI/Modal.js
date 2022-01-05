import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";
import React from "react";

const Backdrop = (props) => {
	return (
		<div
			className={`${classes.backdrop} ${props.top ? classes.backdropTop : ""}`}
			onClick={props.onClose}
		>
			{props.children}
		</div>
	);
};

const ModalOverlay = (props) => {
	return (
		<div className={`${classes.overlay} ${props.top ? classes.overlayTop : classes.overlayFirst}`}>
			{props.children}
		</div>
	);
};

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop top={props.top} onClose={props.onClose} />,
				document.getElementById("backdrop")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay top={props.top}>
					<div className={`${props.center && classes.content}`}>{props.children}</div>
				</ModalOverlay>,
				document.getElementById("modal")
			)}
		</>
	);
};

export default Modal;

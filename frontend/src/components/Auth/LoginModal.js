import Modal from "../UI/Modal";
import Card from "../UI/Card";

import classes from "./LoginModal.module.scss";
import AuthContainer from "./AuthContainer";

const LoginModal = (props) => {
	return (
		<Modal onClose={props.onClose} top>
			<div className={classes.wrapper}>
				<Card>
					<div className={classes.container}>
						<AuthContainer login />
					</div>
				</Card>
			</div>
		</Modal>
	);
};

export default LoginModal;

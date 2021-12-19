import Modal from "../UI/Modal";
import Card from "../UI/Card";
import LoginForm from "./LoginForm";

import classes from "./LoginModal.module.scss";

const LoginModal = (props) => {
	return (
		<Modal onClose={props.onClose} top>
			<div className={classes.wrapper}>
				<Card>
					<div className={classes.container}>
						<LoginForm />
					</div>
				</Card>
			</div>
		</Modal>
	);
};

export default LoginModal;

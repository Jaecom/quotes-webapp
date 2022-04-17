import Button from "../UI/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const LogoutButtonContainer = () => {
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const logoutButtonHandler = async () => {
		authCtx.logout();
		history.replace("/");
	};

	return <Button className="heading-nav" onClick={logoutButtonHandler}>Logout</Button>;
};

export default LogoutButtonContainer;

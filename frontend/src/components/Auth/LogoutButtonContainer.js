import Button from "../UI/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const LogoutButtonContainer = () => {
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const logoutButtonHandler = async () => {
		const res = await fetch("http://localhost:5000/api/users/logout", {
			method: "POST",
			credentials: "include",
		});

		if (!res.ok) {
			return;
		}

		authCtx.logout();
		history.replace("/");
	};

	return <Button onClick={logoutButtonHandler}>Logout</Button>;
};

export default LogoutButtonContainer;

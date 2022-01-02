import { useHistory } from "react-router-dom";
import { useContext, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/auth-context";
import LoginForm from "./Form/LoginForm";
import SignupForm from "./Form/SignupForm";

const AuthContainer = (props) => {
	const formRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();
	const authCtx = useContext(AuthContext);
	const history = useHistory();
	const flag = props.login ? "login" : "signup";

	const submitHandler = async (event) => {
		event.preventDefault();

		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		sendRequest(
			{
				url: `http://localhost:5000/api/users/${flag}`,
				method: "POST",
				body: new URLSearchParams(formObject),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				credentials: "include",
			},
			(data) => {
				console.log(data);
				authCtx.login(data.token, data.expirationDate, data.userId);

				if (history.location.pathname !== `/${flag}`) {
					console.log("reloading");
					window.location.reload();
				} else {
					history.goBack();
				}
			}
		);
	};

	return (
		<>
			{flag === "login" && <LoginForm ref={formRef} onSubmit={submitHandler} />}
			{flag === "signup" && <SignupForm ref={formRef} onSubmit={submitHandler} />}
		</>
	);
};

export default AuthContainer;

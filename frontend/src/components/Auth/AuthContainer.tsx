import { useHistory } from "react-router-dom";
import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import LoginForm from "./Form/LoginForm";
import SignupForm from "./Form/SignupForm";
import useSchemaHttp from "../../hooks/useSchemaHttp";

interface Props {
	login: boolean;
}

const AuthContainer = (props: Props) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [sendRequest, error, errorField] = useSchemaHttp();
	const authCtx = useContext(AuthContext);
	const history = useHistory();
	const flag = props.login ? "login" : "signup";

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(formRef.current ?? undefined);
		const formObject = Object.fromEntries(formData);

		sendRequest(
			{
				url: `http://localhost:5000/api/users/${flag}`,
				method: "POST",
				body: formObject,
			},
			(data) => {
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
			{flag === "login" && <LoginForm ref={formRef} onSubmit={submitHandler} error={error} />}
			{flag === "signup" && (
				<SignupForm
					ref={formRef}
					onSubmit={submitHandler}
					schemaErrors={error}
					errorField={errorField}
				/>
			)}
		</>
	);
};

export default AuthContainer;
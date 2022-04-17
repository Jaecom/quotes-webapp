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
	const history = useHistory<{ beforeAuth: Location }>();
	const flag = props.login ? "login" : "signup";

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(formRef.current ?? undefined);

		sendRequest(
			{
				url: `/api/users/${flag}`,
				method: "POST",
				body: new URLSearchParams(formData as any),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			(data) => {
				authCtx.login(data.expirationDate, data.userId, data?.basicUserData);

				if (history.location.pathname === `/${flag}`) {
					//if auth page
					history.push(history.location.state?.beforeAuth ?? "/");
				} else {
					//if auth modal
					window.location.reload();
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

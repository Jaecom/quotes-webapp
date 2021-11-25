import classes from "./AuthForm.module.scss";
import Input from "./Input";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/auth-context";

const LoginForm = () => {
	const formRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();
	const authCtx = useContext(AuthContext);

	const submitHandler = async (event) => {
		event.preventDefault();

		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		sendRequest(
			{
				url: "http://localhost:5000/api/users/login",
				method: "POST",
				body: new URLSearchParams(formObject),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			(data) => {
				authCtx.login(data.token, data.expirationDate);
			}
		);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler} ref={formRef}>
			<h2 className={`${classes.heading}`}>Login</h2>
			<p className={classes.redirect}>
				Don't have an account?&nbsp;
				<Link to="/signup">Sign Up</Link>
			</p>
			<Input id="email" attribute={{ type: "email" }} label="Email" name="email" />
			<Input id="password" attribute={{ type: "password" }} label="Password" name="password" />
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;

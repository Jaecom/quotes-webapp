import Input from "./Input";
import classes from "./AuthForm.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useContext, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/auth-context";

const SignupForm = () => {
	const formRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const submitHandler = async (event) => {
		event.preventDefault();

		console.log(formRef.current);
		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		sendRequest(
			{
				url: "http://localhost:5000/api/users/signup",
				method: "POST",
				body: new URLSearchParams(formObject),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			(data) => {
				authCtx.login(data.token, data.expirationDate, data.userId);
				
				if (history.location.pathname !== "/signup") {
					window.location.reload();
				} else {
					history.goBack();
				}
			}
		);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler} ref={formRef}>
			<h2 className={`${classes.heading}`}>Sign up</h2>
			<p className={classes.redirect}>
				Already have an account?&nbsp;
				<Link to="/login">Login</Link>
			</p>

			<div className={classes["input-group"]}>
				<Input id="name" attribute={{ type: "text" }} label="Name" name="name" />
				<Input id="username" attribute={{ type: "text" }} label="Username" name="username" />
			</div>
			<Input id="email" attribute={{ type: "email" }} label="Email" name="email" />
			<Input id="password" attribute={{ type: "password" }} label="Password" name="password" />
			<button type="submit">Create Account</button>
		</form>
	);
};

export default SignupForm;

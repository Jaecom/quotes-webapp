import classes from "./AuthForm.module.scss";
import Input from "./Input";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useHttp from "../../hooks/useHttp";

const LoginForm = () => {
	const formRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();

	const submitHandler = async (event) => {
		event.preventDefault();

		console.log(formRef.current);
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
				console.log(data);
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

import Input from "./Input";
import classes from "./AuthForm.module.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useHttp from "../../hooks/useHttp";

const SignupForm = () => {
	const formRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();

	const submitHandler = async (event) => {
		event.preventDefault();

		console.log(formRef.current);
		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		sendRequest({
			url: "http://localhost:5000/api/users",
			method: "POST",
			body: new URLSearchParams(formObject),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
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

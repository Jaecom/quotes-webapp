import Input from "./Input";
import classes from "./Form.module.scss";
import { Link } from "react-router-dom";
import React from "react";

const SignupForm = React.forwardRef((props, ref) => {
	return (
		<form className={classes.form} onSubmit={props.onSubmit} ref={ref}>
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
});

export default SignupForm;

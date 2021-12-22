import classes from "./Form.module.scss";
import Input from "./Input";
import { Link } from "react-router-dom";
import React from "react";

const LoginForm = React.forwardRef((props, ref) => {
	return (
		<form className={classes.form} onSubmit={props.onSubmit} ref={ref}>
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
});

export default LoginForm;
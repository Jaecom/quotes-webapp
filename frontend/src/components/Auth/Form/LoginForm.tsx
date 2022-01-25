import classes from "./Form.module.scss";
import Input from "../../UI/Form/Input";
import { Link } from "react-router-dom";
import React from "react";
import Button from "../../UI/Button";
import ValidationError from "../../UI/Form/ValidationError";
import type { SchemaError } from "../../../hooks/useSchemaHttp";

interface Props {
	onSubmit: (e: React.FormEvent) => Promise<void>;
	error: SchemaError;
}

const LoginForm = React.forwardRef<HTMLFormElement, Props>((props, ref) => {
	return (
		<form className={classes.form} onSubmit={props.onSubmit} ref={ref}>
			<h2 className={`${classes.heading}`}>Login</h2>
			<p className={classes.redirect}>	
				Don't have an account?&nbsp;
				<Link to="/signup">Sign Up</Link>
			</p>
			{props.error && <ValidationError errors="Invalid username or password. Please try again." />}
			<Input
				id="email"
				attribute={{ type: "email" }}
				label="Email"
				name="email"
				error={!!props.error}
			/>
			<Input
				id="password"
				attribute={{ type: "password" }}
				label="Password"
				name="password"
				error={!!props.error}
			/>
			<Button fill type="submit">
				Login
			</Button>
		</form>
	);
});

export default LoginForm;

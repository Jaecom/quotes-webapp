import Input from "./Input";
import classes from "./Form.module.scss";
import { Link } from "react-router-dom";
import React from "react";
import ValidationError from "../../UI/ValidationError";
import Button from "../../UI/Button";

const SignupForm = React.forwardRef((props, ref) => {
	const { schemaErrors, errorField } = props;

	return (
		<form className={classes.form} onSubmit={props.onSubmit} ref={ref}>
			<h2 className={`${classes.heading}`}>Sign up</h2>
			<p className={classes.redirect}>
				Already have an account?&nbsp;
				<Link to="/login">Login</Link>
			</p>

			{schemaErrors && <ValidationError errors={schemaErrors} />}

			<div className={classes["input-group"]}>
				<Input
					id="name"
					attribute={{ type: "text" }}
					label="Name"
					name="name"
					error={errorField?.name}
				/>
				<Input
					id="username"
					attribute={{ type: "text" }}
					label="Username"
					name="username"
					error={errorField?.username}
				/>
			</div>

			<Input
				id="email"
				attribute={{ type: "email" }}
				label="Email"
				name="email"
				error={errorField?.email}
			/>
			<Input
				id="password"
				attribute={{ type: "password" }}
				label="Password"
				name="password"
				error={errorField?.password}
			/>
			<Button fill type="submit">Create Account</Button>
		</form>
	);
});

export default SignupForm;

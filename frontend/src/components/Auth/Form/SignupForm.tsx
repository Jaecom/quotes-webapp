import Input from "../../UI/Form/Input";
import classes from "./Form.module.scss";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import ValidationError from "../../UI/Form/ValidationError";
import Button from "../../UI/Button";
import type { SchemaError } from "../../../hooks/useSchemaHttp";

interface Props {
	onSubmit: (e: React.FormEvent) => Promise<void>;
	schemaErrors?: SchemaError;
	errorField?: { [fieldName: string]: boolean };
}

const SignupForm = React.forwardRef<HTMLFormElement, Props>((props, ref) => {
	const { schemaErrors, errorField } = props;
	const location = useLocation<{ beforeAuth?: Location }>();

	return (
		<form className={classes.form} onSubmit={props.onSubmit} ref={ref}>
			<h2 className={`${classes.heading}`}>Sign up</h2>
			<p className={classes.redirect}>
				Already have an account?&nbsp;
				<Link
					to={{ pathname: "/login", state: { beforeAuth: location.state?.beforeAuth} }}
				>
					Login
				</Link>
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
			<Button fill>
				Create Account
			</Button>
		</form>
	);
});

export default SignupForm;

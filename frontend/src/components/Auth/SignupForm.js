import Input from "./Input";
import classes from "./AuthForm.module.scss";
import { Link } from "react-router-dom";

const SignupForm = () => {
	return (
		<form className={classes.form}>
			<h2 className={`${classes.heading}`}>Sign up</h2>
			<p className={classes.redirect}>
				Already have an account?&nbsp;
				<Link to="/login">Login</Link>
			</p>

			<div className={classes["input-group"]}>
				<Input id="name" attribute={{ type: "text" }} label="Name" />
				<Input id="username" attribute={{ type: "text" }} label="Username" />
			</div>
			<Input id="email" attribute={{ type: "email" }} label="Email" />
			<Input id="password" attribute={{ type: "password" }} label="Password" />
			<button type="submit">Create Account</button>
		</form>
	);
};

export default SignupForm;

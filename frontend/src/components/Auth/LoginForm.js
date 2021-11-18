import classes from "./AuthForm.module.scss";
import Input from "./Input";
import { Link } from "react-router-dom";

const LoginForm = () => {
	return (
		<form>
			<h2 className={`${classes.heading}`}>Login</h2>
			<p className={classes.redirect}>
				Don't have an account?&nbsp;
				<Link to="/signup">Sign Up</Link>
			</p>
			<Input id="email" attribute={{ type: "email" }} label="Email" />
			<Input id="password" attribute={{ type: "password" }} label="Password" />
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;

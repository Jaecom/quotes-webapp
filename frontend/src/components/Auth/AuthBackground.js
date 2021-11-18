import classes from "./AuthBackground.module.scss";

const AuthBackground = (props) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.background}>asd</div>
			<div className={classes.card}>{props.children}</div>
		</div>
	);
};

export default AuthBackground;

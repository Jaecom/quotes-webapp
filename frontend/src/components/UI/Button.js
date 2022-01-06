import classes from "./Button.module.scss";

const Button = (props) => {
	const btnClass =
		classes.btn + (props.highlight && ` ${classes.highlight}`) + ` ${props.className}`;
	return (
		<button className={btnClass} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;

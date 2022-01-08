import classes from "./Button.module.scss";

const Button = (props) => {
	const btnClass = [
		classes.btn,
		props.highlight && classes.highlight,
		props.outline && classes.outline,
		props.className,
	]
		.filter((className) => className !== undefined)
		.join(" ");

	return (
		<button className={btnClass} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;

import React from "react";
import classes from "./Button.module.scss";

interface Props {
	fill?: boolean;
	outline?: boolean;
	className?: string;
	onClick?: (e: React.MouseEvent<any>) => void;
	children?: React.ReactNode;
}

const Button = (props: Props) => {
	const btnClass = [
		classes.btn,
		props.fill && classes.fill,
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

import classes from "./Input.module.scss";
import React from "react";

interface Props {
	id: string;
	name: string;
	label: string;
	error?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	attribute?: {};
}

const Input = React.forwardRef<HTMLInputElement, Props>(
	({ error, id, name, attribute, label, onChange }, ref) => {
		return (
			<fieldset className={classes.fieldset}>
				<label htmlFor={id}>{label}</label>
				<input
					className={`${error ? classes.error : ""}`}
					id={id}
					name={name}
					{...attribute}
					autoComplete="off"
					onChange={onChange}
					ref={ref}
				/>
			</fieldset>
		);
	}
);

export default Input;

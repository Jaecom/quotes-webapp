import classes from "./Input.module.scss";
import React from "react";

interface Props {
	id: string;
	name: string;
	label: string;
	error?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent) => void;
	attribute?: {};
}

const Input = React.forwardRef<HTMLInputElement, Props>(
	({ error, id, name, attribute, label, onChange, onFocus, onBlur, onKeyDown }, ref) => {
		return (
			<fieldset className={classes.fieldset}>
				<label htmlFor={id}>{label}</label>
				<input
					className={`${error ? classes.error : ""}`}
					id={id}
					name={name}
					autoComplete="off"
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
					{...attribute}
					ref={ref}
				/>
			</fieldset>
		);
	}
);

export default Input;

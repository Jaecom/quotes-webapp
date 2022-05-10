import classes from "./Input.module.scss";
import React from "react";

export interface InputProp {
	id: string;
	name: string;
	label: string;
	error?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent) => void;
	attribute?: {};
	value?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProp>(
	({ error, id, name, attribute, label, onChange, onFocus, onBlur, onKeyDown, value }, ref) => {
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
					defaultValue={value}
				/>
			</fieldset>
		);
	}
);

export default Input;

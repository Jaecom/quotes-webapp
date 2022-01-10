import classes from "./Input.module.scss";

const Input = (props) => {
	const { error } = props;

	return (
		<fieldset className={classes.field}>
			<label className={classes.label} htmlFor={props.id}>
				{props.label}
			</label>
			<input
				className={`${classes.input} ${error ? classes.error : ""}`}
				id={props.id}
				name={props.name}
				{...props.attribute}
				autoComplete="off"
			/>
		</fieldset>
	);
};

export default Input;

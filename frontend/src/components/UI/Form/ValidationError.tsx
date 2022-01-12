import classes from "./ValidationError.module.scss";

const ValidationError = (props: { errors: [{ path: string; message: string }] }) => {
	const { errors } = props;

	return (
		<div className={classes["error-container"]}>
			{!Array.isArray(errors) && <p>{errors}</p>}
			{Array.isArray(errors) && errors.map((error) => <p key={error.path}>{error.message}</p>)}
		</div>
	);
};

export default ValidationError;

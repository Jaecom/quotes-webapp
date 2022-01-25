import classes from "./ValidationError.module.scss";

interface Props {
	errors: [{ path: string; message: string }] | string;
}

const ValidationError = (props: Props) => {
	const { errors } = props;

	return (
		<div className={classes["error-container"]}>
			{!Array.isArray(errors) && <p>{errors}</p>}
			{Array.isArray(errors) && errors.map((error) => <p key={error.path}>{error.message}</p>)}
		</div>
	);
};

export default ValidationError;

import { SchemaError } from "../../../hooks/useSchemaHttp";
import classes from "./ValidationError.module.scss";

interface Props {
	errors: SchemaError;
	className?: string;
}

const ValidationError = (props: Props) => {
	const { errors, className } = props;

	return (
		<div className={`${className} ${classes["error-container"]}`}>
			{!Array.isArray(errors) && <p>{errors}</p>}
			{Array.isArray(errors) && errors.map((error) => <p key={error.path}>{error.message}</p>)}
		</div>
	);
};

export default ValidationError;

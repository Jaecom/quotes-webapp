import classes from "./CollectionForm.module.scss";
import inputClasses from "components/UI/Form/Input.module.scss";
import Input from "components/UI/Form/Input";
import ValidationError from "components/UI/Form/ValidationError";
import Button from "components/UI/Button";
import { ErrorField, SchemaError } from "hooks/useSchemaHttp";

interface Props {
	onSubmit: (e: React.FormEvent) => void;
	formRef: React.RefObject<HTMLFormElement>;
	schemaErrors: SchemaError;
	errorField: ErrorField;
	onClose: () => void;
	title?: string;
	description?: string;
	isPrivate?: boolean;
	keyword: string;
}

const CollectionForm = (props: Props) => {
	const {
		onSubmit,
		formRef,
		schemaErrors,
		errorField,
		onClose,
		keyword,
		description,
		isPrivate,
		title,
	} = props;

	return (
		<form onSubmit={onSubmit} className={classes.form} ref={formRef}>
			<h2 className={classes.heading}>{`${keyword} a Collection`}</h2>
			{schemaErrors && <ValidationError errors={schemaErrors} />}
			<Input
				id="collectionName"
				attribute={{ type: "text" }}
				label="Name"
				name="name"
				error={errorField?.name}
				value={title}
			/>
			<Input
				id="collectionDescription"
				attribute={{ type: "text" }}
				label="Description"
				name="description"
				value={description}
			/>

			<fieldset className={`${inputClasses.fieldset} ${classes.checkbox}`}>
				<label htmlFor="privateCheckbox">Private</label>
				<input
					type="checkbox"
					id="privateCheckbox"
					name="isPrivate"
					value={isPrivate ? "true" : "false"}
				/>
			</fieldset>

			<div className={classes["button-container"]}>
				<Button type="submit" fill>
					{keyword}
				</Button>
				<Button outline onClick={onClose}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default CollectionForm;

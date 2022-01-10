import classes from "./AddCollectionForm.module.scss";
import Input from "../Auth/Form/Input";
import Button from "../UI/Button";
import { useRef } from "react";
import ValidationError from "../UI/ValidationError";
import useSchemaHttp from "../../hooks/useSchemaHttp";

const AddCollectionForm = (props) => {
	console.log("AddCollectionForm");
	const formRef = useRef();
	const [sendRequest, schemaErrors, errorField] = useSchemaHttp();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		sendRequest(
			{
				url: "http://localhost:5000/api/collections",
				method: "POST",
				body: formObject,
			},
			(data) => {
				return props.onAddCollection(data);
			}
		);
	};

	return (
		<form onSubmit={onSubmitHandler} className={classes.form} ref={formRef}>
			<h2 className={classes.heading}>Create a Collection</h2>
			{schemaErrors && <ValidationError errors={schemaErrors} />}
			<Input
				id="collectionName"
				attribute={{ type: "text" }}
				label="Name"
				name="name"
				error={errorField?.name}
			/>
			<Input
				id="collectionDescription"
				attribute={{ type: "text" }}
				label="Description"
				name="description"
			/>

			<fieldset className={classes.checkbox}>
				<label htmlFor="privateCheckbox">Private</label>
				<input type="checkbox" id="privateCheckbox" name="isPrivate" value="true" />
			</fieldset>

			<div className={classes["button-container"]}>
				<Button type="submit" fill>
					Create
				</Button>
				<Button outline onClick={props.onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default AddCollectionForm;

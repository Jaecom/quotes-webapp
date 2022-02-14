import classes from "./CreateCollectionForm.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";

import Input from "../../UI/Form/Input";
import Button from "../../UI/Button";
import React, { useRef } from "react";
import ValidationError from "../../UI/Form/ValidationError";
import useSchemaHttp from "../../../hooks/useSchemaHttp";

interface Props {
	onCancel: () => void;
	onAddCollection: (data: any) => void;
}

const CreateCollectionForm = ({ onCancel, onAddCollection }: Props) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [sendRequest, schemaErrors, errorField] = useSchemaHttp();

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(formRef.current ?? undefined);

		sendRequest(
			{
				url: "/api/collections",
				method: "POST",
				body: new URLSearchParams(formData as any),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			(data) => {
				return onAddCollection(data);
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

			<fieldset className={`${inputClasses.fieldset} ${classes.checkbox}`}>
				<label htmlFor="privateCheckbox">Private</label>
				<input type="checkbox" id="privateCheckbox" name="isPrivate" value="true" />
			</fieldset>

			<div className={classes["button-container"]}>
				<Button type="submit" fill>
					Create
				</Button>
				<Button outline onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default CreateCollectionForm;

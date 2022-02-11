import React from "react";
import useSchemaHttp from "../../../hooks/useSchemaHttp";
import CreateQuoteForm from "./CreateQuoteForm";

const CreateQuoteContainer = () => {
	const [sendRequest, errors, errorfield] = useSchemaHttp();

	const submitFormHandler = (formData: FormData) => {
		sendRequest(
			{
				url: "/api/quotes",
				method: "POST",
				body: formData,
			},
			(data: any) => {
				console.log(data);
				console.log(errors);
			}
		);
	};

	const saveDraftHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("saving draft");
	};

	const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("cancel");
	};

	return (
		<CreateQuoteForm
			onCancel={cancelHandler}
			onSubmitForm={submitFormHandler}
			onSaveDraft={saveDraftHandler}
			errors={errors}
			errorField={errorfield}
		/>
	);
};

export default CreateQuoteContainer;

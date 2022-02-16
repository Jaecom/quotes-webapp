import React from "react";
import { useHistory } from "react-router-dom";
import useSchemaHttp from "../../../hooks/useSchemaHttp";
import CreateQuoteForm from "./CreateQuoteForm";

const CreateQuoteContainer = () => {
	const [sendRequest, errors, errorfield] = useSchemaHttp();
	const history = useHistory();

	const submitFormHandler = (formData: FormData) => {
		sendRequest(
			{
				url: "/api/quotes",
				method: "POST",
				body: formData,
			},
			(data) => {
				return history.push("/");
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

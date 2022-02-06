import React from "react";
import useHttp from "../../../hooks/useHttp";
import CreateQuoteForm from "./CreateQuoteForm";

const CreateQuoteContainer = () => {
	const [sendRequest] = useHttp();

	const submitFormHandler = (formData: FormData) => {
		sendRequest(
			{
				url: "/api/quotes",
				method: "POST",
				body: formData,
				headers: {},
				credentials: "include",
			},
			(data: any) => {
				console.log(data);
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
		/>
	);
};

export default CreateQuoteContainer;

import React from "react";
import CreateQuoteForm from "./CreateQuoteForm";

const CreateQuoteContainer = () => {
	const saveDraftHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("saving draft");
	};

	const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("cancel");
	};

	const submitFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("form submitted");
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

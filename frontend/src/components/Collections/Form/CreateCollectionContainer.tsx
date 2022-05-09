import React, { useRef } from "react";
import useSchemaHttp from "../../../hooks/useSchemaHttp";
import type { Collection } from "data-type";
import { createCollection } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import CollectionForm from "./CollectionForm";

interface Props {
	onClose: () => void;
}

const CreateCollectionForm = ({ onClose }: Props) => {
	const dispatch = useDispatch();
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
			(data: Collection) => {
				dispatch(createCollection(data));
				onClose();
			}
		);
	};

	return (
		<CollectionForm
			onSubmit={onSubmitHandler}
			formRef={formRef}
			schemaErrors={schemaErrors}
			errorField={errorField}
			onClose={onClose}
		/>
	);
};

export default CreateCollectionForm;

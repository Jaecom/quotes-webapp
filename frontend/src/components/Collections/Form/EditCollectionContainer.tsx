import React, { useRef } from "react";
import useSchemaHttp from "../../../hooks/useSchemaHttp";
import type { Collection } from "data-type";
import { editCollection } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CollectionForm from "./CollectionForm";

interface Props {
	onClose: () => void;
	collectionId: string;
}

const EditCollectionContainer = ({ onClose, collectionId }: Props) => {
	const dispatch = useDispatch();
	const formRef = useRef<HTMLFormElement>(null);
	const [sendRequest, schemaErrors, errorField] = useSchemaHttp();

	const { collections } = useSelector((state: any) => state.user);
	const collection: Collection = collections.find(
		(collection: Collection) => collection._id === collectionId
	);

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(formRef.current ?? undefined);

		sendRequest(
			{
				url: `/api/collections/${collectionId}`,
				method: "PATCH",
				body: new URLSearchParams(formData as any),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			(data: { collection: Collection[] }) => {
				dispatch(editCollection(data.collection));
				onClose();
			}
		);
	};

	return (
		<CollectionForm
			keyword="Edit"
			onSubmit={onSubmitHandler}
			formRef={formRef}
			schemaErrors={schemaErrors}
			errorField={errorField}
			onClose={onClose}
			title={collection.name}
			description={collection.description}
			isPrivate={collection.isPrivate}
		/>
	);
};

export default EditCollectionContainer;

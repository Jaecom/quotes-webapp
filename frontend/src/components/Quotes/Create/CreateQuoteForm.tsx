import classes from "./CreateQuoteForm.module.scss";
import btnClasses from "../../UI/Button.module.scss";

import Input from "../../UI/Form/Input";
import Button from "../../UI/Button";

import React, { MouseEvent, useRef, useState } from "react";
import PreviewImage from "./PreviewImage";
import useModal from "../../../hooks/useModal";
import Modal from "../../UI/Modal";
import InputAndSuggestions from "./InputAndSuggestions";
import QuoteTextInput from "./QuoteTextInput";
import ValidationError from "../../UI/Form/ValidationError";
import { ErrorField, SchemaError } from "../../../hooks/useSchemaHttp";

interface TitleSuggests {
	title: string;
	author: string;
	genre: string[];
}

interface Props {
	onSubmitForm: (formData: FormData) => void;
	onSaveDraft: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
	errors: SchemaError;
	errorField: ErrorField;
}

const CreateQuoteForm = ({ onSubmitForm, onSaveDraft, onCancel, errors, errorField }: Props) => {
	const [imageUrl, setImageUrl] = useState("");
	const [isModalOpen, openModal, closeModal] = useModal();
	const [localImage, setLocalImage] = useState("");

	const imageUrlInputRef = useRef<HTMLInputElement>(null);
	const titleInputRef = useRef<HTMLInputElement>(null);
	const authorInputRef = useRef<HTMLInputElement>(null);
	const genreInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);

	const findImagesHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		openModal();
	};

	const onFormSubmitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		formData.append("quote", quoteRef.current?.textContent ?? "");

		onSubmitForm(formData);
	};

	const onTitleClick = (object: any) => {
		titleInputRef.current!.value = object.title;
		authorInputRef.current!.value = object.author;
		genreInputRef.current!.value = object.genres?.join(" ") ?? "";
	};

	const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (file) {
			const url = URL.createObjectURL(file);
			setLocalImage(url);
		}
	};

	return (
		<>
			{isModalOpen && <Modal onClose={closeModal}></Modal>}
			<div className={classes.wrapper}>
				{errors && <ValidationError errors={errors} className={classes["error-box"]} />}
				<form className={`${classes["container--vertical"]} ${classes.form}`} ref={formRef}>
					<div className={classes["container--horizontal"]}>
						<PreviewImage inputUrl={imageUrl} localImage={localImage} inputRef={imageUrlInputRef} />
						<div>
							<div className={classes["container--vertical"]}>
								<InputAndSuggestions<TitleSuggests>
									id="title"
									attribute={{ type: "text" }}
									label="Title"
									name="title"
									onSuggestClick={onTitleClick}
									inputRef={titleInputRef}
									apiUrl={(title) => `/api/book-search/${title}`}
									suggestChildren={(suggest) => {
										return (
											<>
												<p style={{ fontSize: "1.3rem" }}>{suggest.title}</p>
												<p>{suggest.author}</p>
											</>
										);
									}}
									error={errorField.title}
								/>
								<Input
									id="author"
									attribute={{ type: "text" }}
									label="Author"
									name="author"
									ref={authorInputRef}
									error={errorField.author}
								/>
								<Input
									id="genre"
									attribute={{ type: "text" }}
									label="Genre"
									name="genre"
									ref={genreInputRef}
									error={errorField.genre}
								/>
								<div className={classes["container--horizontal"]}>
									<Input
										id="image"
										attribute={{ type: "text" }}
										label="Image URL"
										name="imageUrl"
										onChange={(e) => {
											setImageUrl(e.target.value);
										}}
										ref={imageUrlInputRef}
									/>
									<div className={classes["file-input-container"]}>
										<label
											htmlFor="file"
											className={`${btnClasses.btn} ${btnClasses.outline} ${classes["file-input-btn"]}`}
										>
											Upload
										</label>
										<input
											id="file"
											type="file"
											name="imageFile"
											className={classes["file-input"]}
											onChange={onFileInputChange}
											accept="image/png, image/jpeg"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<QuoteTextInput quoteRef={quoteRef} error={errorField.quote} />

					<div className={classes.controls}>
						<Button onClick={onCancel} outline>
							Cancel
						</Button>
						<div>
							<Button onClick={onSaveDraft} outline>
								Save as draft
							</Button>
							<Button onClick={onFormSubmitHandler} fill className={classes["btn-submit"]}>
								Create
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateQuoteForm;

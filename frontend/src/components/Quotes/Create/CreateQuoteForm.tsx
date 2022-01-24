import classes from "./CreateQuoteForm.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";

import Input from "../../UI/Form/Input";
import Button from "../../UI/Button";

import React, { MouseEvent, useRef, useState } from "react";
import PreviewImage from "./PreviewImage";
import useModal from "../../../hooks/useModal";
import Modal from "../../UI/Modal";
import InputAndSuggestions from "./InputAndSuggestions";

interface TitleSuggests {
	title: string;
	author: string;
	genre: string[];
}

interface Props {
	onSubmitForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onSaveDraft: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateQuoteForm = ({ onSubmitForm, onSaveDraft, onCancel }: Props) => {
	const [imageUrl, setImageUrl] = useState("");
	const [isModalOpen, openModal, closeModal] = useModal();

	const imageUrlInputRef = useRef<HTMLInputElement>(null);
	const titleInputRef = useRef<HTMLInputElement>(null);
	const authorInputRef = useRef<HTMLInputElement>(null);
	const genreInputRef = useRef<HTMLInputElement>(null);

	const findImagesHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		openModal();
	};

	const onTitleClick = (object: any) => {
		titleInputRef.current!.value = object.title;
		authorInputRef.current!.value = object.author;
		genreInputRef.current!.value = object.genres?.join(" ") ?? "";
	};

	return (
		<>
			{isModalOpen && <Modal onClose={closeModal}></Modal>}
			<div className={classes.wrapper}>
				<form className={classes["container--vertical"]}>
					<div className={classes["container--horizontal"]}>
						<PreviewImage inputUrl={imageUrl} inputRef={imageUrlInputRef} />
						<div>
							<div className={classes["container--vertical"]}>
								<InputAndSuggestions<TitleSuggests>
									id="source"
									attribute={{ type: "text" }}
									label="Title"
									name="source"
									onSuggestClick={onTitleClick}
									inputRef={titleInputRef}
									apiUrl={(title) => `http://localhost:5000/api/book-search/${title}`}
									suggestChildren={(suggest) => {
										return (
											<>
												<p style={{ fontSize: "1.3rem" }}>{suggest.title}</p>
												<p>{suggest.author}</p>
											</>
										);
									}}
								/>
								<Input
									id="author"
									attribute={{ type: "text" }}
									label="Author"
									name="author"
									ref={authorInputRef}
								/>
								<Input
									id="genre"
									attribute={{ type: "text" }}
									label="Genre"
									name="genre"
									ref={genreInputRef}
								/>
								<div className={classes["container--horizontal"]}>
									<Input
										id="image"
										attribute={{ type: "text" }}
										label="Image URL"
										name="image"
										onChange={(e) => {
											setImageUrl(e.target.value);
										}}
										ref={imageUrlInputRef}
									/>
									<Button outline onClick={findImagesHandler} className={classes["btn-image"]}>
										Upload
									</Button>
								</div>
							</div>
						</div>
					</div>

					<fieldset className={`${inputClasses.fieldset}`}>
						<label>Quote</label>
						<textarea className={classes["text-area"]} id="quote" name="quote" />
					</fieldset>

					<div className={classes.controls}>
						<Button onClick={onCancel} outline>
							Cancel
						</Button>
						<div>
							<Button onClick={onSaveDraft} outline>
								Save as draft
							</Button>
							<Button onClick={onSubmitForm} fill className={classes["btn-upload"]}>
								Upload
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateQuoteForm;

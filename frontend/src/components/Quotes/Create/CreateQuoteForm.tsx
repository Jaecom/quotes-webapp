import classes from "./CreateQuoteForm.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";

import Input from "../../UI/Form/Input";
import Button from "../../UI/Button";

import React, { MouseEvent, useRef, useState } from "react";
import PreviewImage from "./PreviewImage";
import useModal from "../../../hooks/useModal";
import Modal from "../../UI/Modal";

interface Props {
	onSubmitForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onSaveDraft: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateQuoteForm = ({ onSubmitForm, onSaveDraft, onCancel }: Props) => {
	const [imageUrl, setImageUrl] = useState("");
	const [isModalOpen, openModal, closeModal] = useModal();
	const imageUrlInputRef = useRef<HTMLInputElement>(null);

	const onUrlInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageUrl = e.target.value;
		setImageUrl(imageUrl);
	};

	const findImagesHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		openModal();
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
								<Input id="source" attribute={{ type: "text" }} label="Title" name="source" />
								<Input id="author" attribute={{ type: "text" }} label="Author" name="author" />
								<Input id="genre" attribute={{ type: "text" }} label="Genre" name="genre" />
								<div className={classes["container--horizontal"]}>
									<Input
										id="image"
										attribute={{ type: "text" }}
										label="Image URL"
										name="image"
										onChange={onUrlInputChange}
										ref={imageUrlInputRef}
									/>
									<Button outline onClick={findImagesHandler} className={classes["btn-image"]}>
										Unsplash
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

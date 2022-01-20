import React, { useState } from "react";
import classes from "./CreateQuoteInputSuggests.module.scss";
import Input from "../../UI/Form/Input";
import useHttp from "../../../hooks/useHttp";

let titleTimer: ReturnType<typeof setTimeout>;

interface Props {
	onSuggestsClick: (suggestItem: SuggestItem) => void;
}

interface Suggestion {
	title: string;
	author: string;
	genre: string[];
}

interface SuggestItem extends Suggestion {
	index: number;
}

const defaultSuggestItem = { index: 0, author: "", genre: [], title: "" };

const CreateQuoteInputSuggests = React.forwardRef<HTMLInputElement, Props>(
	({ onSuggestsClick }, ref) => {
		const [suggestionList, setSuggestionList] = useState<Suggestion[]>([]);
		const [suggestItem, setSuggestItem] = useState<SuggestItem>(defaultSuggestItem);

		const [isFocused, setIsFocused] = useState(false);
		const [sendRequest] = useHttp();

		const titleChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
			const titleInput = e.target.value;

			if (titleInput.trim() === "") {
				setSuggestionList([]);
				return clearTimeout(titleTimer);
			}

			clearTimeout(titleTimer);
			titleTimer = setTimeout(() => {
				console.log(titleInput);
				sendRequest(
					{
						url: `http://localhost:5000/api/book-search/${titleInput}`,
						method: "GET",
						credentials: "include",
					},
					(data: Suggestion[]) => {
						setSuggestionList(data);
						setSuggestItem({ ...data[0], index: 0 });
					}
				);
			}, 200);
		};

		const onKeyDownHandler = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}

			if (!suggestionList || suggestionList.length === 0) {
				setSuggestItem(defaultSuggestItem);
				return;
			}

			switch (e.key) {
				case "ArrowUp": {
					if (suggestItem.index > 0) {
						const index = suggestItem.index - 1;
						const suggestionItem = suggestionList[index];

						setSuggestItem({ ...suggestionItem, index });
					}
					break;
				}

				case "ArrowDown": {
					if (suggestItem.index < suggestionList.length - 1) {
						const index = suggestItem.index + 1;
						const suggestionItem = suggestionList[index];
						setSuggestItem({ ...suggestionItem, index });
					}
					break;
				}

				case "Enter": {
					onSuggestsClick(suggestItem);
					setSuggestionList([]);
					break;
				}
			}
		};

		return (
			<div className={classes["input-container"]}>
				<Input
					id="source"
					attribute={{ type: "text" }}
					label="Title"
					name="source"
					onChange={titleChangeHandler}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					ref={ref}
					onKeyDown={onKeyDownHandler}
				/>
				<ul className={classes.suggests}>
					{isFocused &&
						suggestionList.length > 0 &&
						suggestionList.map((element, index) => (
							<li
								key={index}
								onMouseDown={() => {
									onSuggestsClick(suggestItem);
								}}
								onMouseOver={() => {
									setSuggestItem({ ...element, index });
								}}
								className={suggestItem.index === index ? classes.select : ""}
							>
								<p className={classes["suggests-title"]}>{element.title}</p>
								<p className={classes["suggests-author"]}>{element.author}</p>
							</li>
						))}
				</ul>
			</div>
		);
	}
);

export default CreateQuoteInputSuggests;

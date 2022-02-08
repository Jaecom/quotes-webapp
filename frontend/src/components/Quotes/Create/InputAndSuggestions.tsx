import React, { ReactElement, useState } from "react";
import classes from "./InputAndSuggestions.module.scss";
import Input from "../../UI/Form/Input";
import useHttp from "../../../hooks/useHttp";
import { InputProp } from "../../UI/Form/Input";

let timer: ReturnType<typeof setTimeout>;

interface Props<T> {
	onSuggestClick: (suggestItem: T) => void;
	suggestChildren: (suggestItem: T) => ReactElement;
	apiUrl: (query: string) => string;
	inputRef: React.Ref<HTMLInputElement>;
	error: boolean | undefined;
}

const InputAndSuggestions = <T extends object>({
	onSuggestClick,
	inputRef,
	suggestChildren,
	apiUrl,
	id,
	name,
	label,
	attribute,
	error,
}: Props<T> & InputProp) => {
	const [isFocused, setIsFocused] = useState(false);
	const [sendRequest, isLoading] = useHttp();

	const [suggestList, setSuggestList] = useState<T[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (inputValue.trim() === "") {
			setSuggestList([]);
			return clearTimeout(timer);
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			sendRequest(
				{
					url: apiUrl(inputValue),
					method: "GET",
					credentials: "include",
				},
				(data: T[]) => {
					setSuggestList(data);
					setSelectedIndex(0);
				}
			);
		}, 200);
	};

	const onKeyDownHandler = (e: React.KeyboardEvent) => {
		if (!suggestList || suggestList.length === 0) {
			setSelectedIndex(0);
			return;
		}

		switch (e.key) {
			case "ArrowUp": {
				if (selectedIndex > 0) {
					setSelectedIndex((index) => index - 1);
				}
				e.preventDefault();
				break;
			}

			case "ArrowDown": {
				if (selectedIndex < suggestList.length - 1) {
					setSelectedIndex((index) => index + 1);
				}
				e.preventDefault();
				break;
			}

			case "Enter": {
				e.preventDefault();
				onSuggestClick(suggestList[selectedIndex]);
				setSuggestList([]);
				break;
			}
		}
	};

	return (
		<div className={classes["input-container"]}>
			<Input
				id={id}
				attribute={attribute}
				label={label}
				name={name}
				onChange={inputChangeHandler}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				ref={inputRef}
				onKeyDown={onKeyDownHandler}
				error={error}
			/>
			<ul className={classes.suggests}>
				{isFocused &&
					suggestList.length > 0 &&
					suggestList.map((element, index) => (
						<li
							key={index}
							onMouseDown={() => {
								onSuggestClick(suggestList[index]);
							}}
							onMouseOver={() => {
								setSelectedIndex(index);
							}}
							className={selectedIndex === index ? classes.select : ""}
						>
							{suggestChildren(element)}
						</li>
					))}
			</ul>
		</div>
	);
};

export default InputAndSuggestions;

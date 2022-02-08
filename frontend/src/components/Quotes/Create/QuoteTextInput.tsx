import React from "react";
import classes from "./QuoteTextInput.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";

let keydown = "";
let currentKeyQuote = "";

const removeTags = (string: string) => {
	return string.replace(/<mark>|<\/mark>|/g, "");
};

const getKeyQuote = (string: string | null) => {
	if (!string) return;
	return string.match(/<.+>/)?.toString();
};

const removeMarkers = (string: string) => {
	return string.replaceAll(/<|>/g, "");
};

interface Props {
	quoteRef: React.RefObject<HTMLDivElement>;
	error: boolean | undefined;
}

const QuoteTextInput = ({ quoteRef, error }: Props) => {
	const selection = window.getSelection();

	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		keydown = e.key;
	};

	const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const quoteInput = quoteRef!.current;

		if (!quoteInput) return;

		switch (keydown) {
			case "<":
			case ">":
				const foundKeyQuote = getKeyQuote(quoteInput.textContent);

				if (!foundKeyQuote || foundKeyQuote === currentKeyQuote) return;

				const keyQuoteHTML = "&lt;" + removeMarkers(foundKeyQuote) + "&gt;";

				quoteInput.innerHTML = quoteInput.textContent!.replace(
					foundKeyQuote,
					`<mark>${keyQuoteHTML}</mark>`
				);

				currentKeyQuote = foundKeyQuote;

				//is last node not TextNode, create TextNode
				if (quoteInput.childNodes[quoteInput.childNodes.length - 1].nodeType === 1) {
					quoteInput.appendChild(document.createTextNode(" "));
				}

				let indexOfB = -1;

				quoteInput.childNodes.forEach((element, index) => {
					if (element.nodeType === 1) {
						indexOfB = index;
					}
				});

				//reposition cursor
				const range = document.createRange();

				if (keydown === ">") {
					range.setStart(quoteInput.childNodes[indexOfB + 1], 0);
				} else if (keydown === "<") {
					range.setStart(quoteInput.childNodes[indexOfB], 0);
				}
				range.collapse(true);

				selection?.removeAllRanges();
				selection?.addRange(range);
				break;

			case "Delete":
			case "Backspace": {
				const isKeyQuotePresent = getKeyQuote(quoteInput.textContent);

				//opposite of currentKeyQuote && !isKeyQuotePresent
				if (!currentKeyQuote || isKeyQuotePresent) return;

				quoteInput.innerHTML = removeTags(quoteInput.innerHTML);
				const remainingSign = quoteInput.textContent?.match(/<|>/)?.toString();

				const keyQuoteRaw = removeMarkers(currentKeyQuote);
				const index = quoteInput.textContent!.toString().indexOf(keyQuoteRaw.toString());

				quoteInput.textContent = removeMarkers(quoteInput.textContent ?? "");

				currentKeyQuote = "";

				const range = document.createRange();

				if (remainingSign === ">") {
					range.setStart(quoteInput.childNodes[0], index);
				} else if (remainingSign === "<") {
					range.setStart(quoteInput.childNodes[0], index + keyQuoteRaw.length);
				}
				range.collapse(true);

				selection?.removeAllRanges();
				selection?.addRange(range);
				break;
			}
		}
	};

	const onPaste = (e: React.ClipboardEvent) => {
		const rawText = e.clipboardData.getData("text/plain");

		if (selection) {
			const range = selection.getRangeAt(0);
			range.deleteContents();
			range.insertNode(document.createTextNode(rawText));
			e.preventDefault();
		}
	};

	return (
		<fieldset className={`${inputClasses.fieldset}`}>
			<label>Quote</label>
			<div
				contentEditable
				className={`${classes["quote-text"]} ${error ? inputClasses.error : ""}`}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
				ref={quoteRef}
				onPaste={onPaste}
			/>
		</fieldset>
	);
};

export default QuoteTextInput;

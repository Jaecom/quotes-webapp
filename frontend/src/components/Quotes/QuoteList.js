import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.scss";
import { useState } from "react";
import QuoteDetail from "./QuoteDetail";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import React from "react";

const QuoteList = (props) => {
	let location = useLocation();

	return (
		<>
			<div className={classes["quote-container"]}>
				{props.quotes.map((quote) => (
						<QuoteItem key={quote.id} quote={quote} />
				))}
			</div>
		</>
	);
};

export default QuoteList;

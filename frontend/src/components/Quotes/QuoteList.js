import React from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.scss";

const QuoteList = React.forwardRef((props, ref) => {
	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					{props.quotes?.map((quote) => (
						<QuoteItem key={quote.id} quote={quote} onQuoteLike={props.onQuoteLike.bind(null, quote.id)} />
					))}
				</div>
				<div className={classes.bottom} ref={ref}></div>
			</div>
		</>
	);
});

export default QuoteList;

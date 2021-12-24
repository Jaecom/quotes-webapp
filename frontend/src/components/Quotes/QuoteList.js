import React from "react";
import classes from "./QuoteList.module.scss";
import QuoteItemContainer from "./QuoteItemContainer";

const QuoteList = React.forwardRef((props, ref) => {
	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					{props.children}
					{props.quotes?.map((quote) => (
						<QuoteItemContainer key={quote.id} quote={quote} />
					))}
				</div>
				<div className={classes.bottom} ref={ref}></div>
			</div>
		</>
	);
});

export default QuoteList;

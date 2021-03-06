import React from "react";
import classes from "./QuoteList.module.scss";
import QuoteItemContainer from "./QuoteItemContainer";
import QuoteListBanner from "./QuoteListBanner";
import Loading from "../UI/Loading/Loading";
import { QuoteItemPlaceHolders } from "./QuotePlaceHolder";
import type { Quote } from "data-type";

interface Props {
	quotes: Quote[];
	quoteBottomRef: React.RefObject<HTMLDivElement>;
	loading: boolean;
}

const QuoteList = (props: Props) => {
	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					{props.quotes?.map((quote) =>
						quote.isBanner ? (
							<QuoteListBanner key={quote._id} quote={quote} />
						) : (
							<QuoteItemContainer key={quote._id} quote={quote} />
						)
					)}
					{props.loading && <QuoteItemPlaceHolders count={10} />}
				</div>
				<div className={classes.bottom} ref={props.quoteBottomRef} />
			</div>
		</>
	);
};

export default QuoteList;

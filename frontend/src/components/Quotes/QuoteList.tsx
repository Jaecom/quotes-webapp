import React from "react";
import classes from "./QuoteList.module.scss";
import QuoteItemContainer from "./QuoteItemContainer";
import QuoteListBanner from "./QuoteListBanner";
import Loading from "../UI/Loading/Loading";

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
							<QuoteListBanner key={quote.id} quote={quote} />
						) : (
							<QuoteItemContainer key={quote.id} quote={quote} />
						)
					)}
				</div>
				<div className={classes.bottom} ref={props.quoteBottomRef} />
				<div className={classes.loading}>{props.loading && <Loading />}</div>
			</div>
		</>
	);
};

export default QuoteList;

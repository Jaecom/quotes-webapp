import classes from "./MoreBy.module.scss";
import QuoteDetailItemContainer from "./QuoteDetailItemContainer";

const MoreBy = (props) => {
	const quotes = props.quotes;

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<h3 className={`${classes.header} heading-3`}>{props.text}</h3>
				{quotes.map((quote) => (
					<QuoteDetailItemContainer key={quote.id} quote={quote} />
				))}
			</div>
		</div>
	);
};

export default MoreBy;

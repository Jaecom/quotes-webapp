import classes from "./MoreBy.module.scss";
import QuoteItem from "../QuoteItem";

const MoreBy = (props) => {
	const quotes = props.quotes;

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<h3 className={`${classes.header} heading-3`}>{props.text}</h3>
				{quotes.map((quote) => (
					<QuoteItem key={quote.id} quote={quote} />
				))}
			</div>
		</div>
	);
};

export default MoreBy;

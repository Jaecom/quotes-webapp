import classes from "./QuoteDetailPlaceholder.module.scss";
import quoteDetailClasses from "./QuoteDetail.module.scss";

const QuoteDetailPlaceholder = () => {
	return (
		<>
			<div className={classes.top} />
			<div className={quoteDetailClasses.padding}>
				<div className={classes.content}>
					<div className={classes.title} />
					<div className={classes.keyquote} />
					<div className={classes.genre} />
					<div className={classes.image} />
					<div className={classes.quote} />
				</div>
			</div>
		</>
	);
};

export default QuoteDetailPlaceholder;

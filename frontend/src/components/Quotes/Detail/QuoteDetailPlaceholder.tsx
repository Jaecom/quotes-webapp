import classes from "./QuoteDetailPlaceholder.module.scss";
import quoteDetailClasses from "./QuoteDetail.module.scss";

const QuoteDetailPlaceholder = () => {
	return (
		<div className={quoteDetailClasses.wrapper}>
			<div className={quoteDetailClasses.padding}>
				<div className={quoteDetailClasses.content}>
					<div className={classes.top} />
					<div className={classes["summary-container"]}>
						<div className={classes.keyword} />
						<div className={classes.summary} />
					</div>
					<div className={classes.image} />
					<div className={classes.quote} />
				</div>
			</div>
		</div>
	);
};

export default QuoteDetailPlaceholder;

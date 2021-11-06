import classes from "./QuoteSearchNotFound.module.scss";
const QuoteSearchNotFound = (props) => {
	return (
		<div className={classes.wrapper}>
			<div>
				<div>No results found for</div>
				<div>{props.searchWord}</div>

				<div className={classes["icon-wrapper"]}>
					<div className={classes.icon}>
						<div className={classes.book}></div>
						<div className={classes.book}></div>
						<div className={classes.book}></div>
						<div className={classes.book}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuoteSearchNotFound;

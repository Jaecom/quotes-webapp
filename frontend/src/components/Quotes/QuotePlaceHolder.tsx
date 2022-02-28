import classes from "./QuotePlaceHolder.module.scss";
import quoteListClasses from "./QuoteList.module.scss";

const fillWithPlaceHolders = (count: number) => {
	const arrayPlaceHolder = new Array(count).fill(0);
	return (
		<>
			{arrayPlaceHolder.map(() => (
				<PlaceHolderItem />
			))}
		</>
	);
};

const QuoteListPlaceHolder = (props: { count: number }) => {
	return (
		<div className={quoteListClasses.wrapper}>
			<div className={quoteListClasses.container}>{fillWithPlaceHolders(props.count)}</div>
		</div>
	);
};

const QuoteItemPlaceHolders = (props: { count: number }) => {
	return fillWithPlaceHolders(props.count);
};

const PlaceHolderItem = () => {
	return (
		<div>
			<div className={classes.wrapper} />
			<div className={classes.heading} />
			<div className={classes.sub} />
		</div>
	);
};

export { QuoteListPlaceHolder, QuoteItemPlaceHolders };

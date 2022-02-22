import classes from "./QuoteDetail.module.scss";
import MoreBy from "./MoreBy";

interface Props {
	quote: Quote;
	otherQuotesByAuthor: Quote[] | null | undefined;
	recommendQuotes: Quote[] | null | undefined;
}

const QuoteDetail = (props: Props) => {
	const { quote, otherQuotesByAuthor, recommendQuotes } = props;

	return (
		<div className={classes.wrapper}>
			<div className={classes.padding}>
				<div className={classes.content}>
					<div className={classes.info}>
						<h3 className="heading-4--bold">{quote.title}</h3>
						<h3 className="heading-4">{quote.author.name}</h3>
					</div>

					<div className={classes.key}>
						<p className={`paragraph--big ${classes["quotation-mark"]}`}>&ldquo;</p>
						<h2 className="paragraph--big">{quote.keywords}</h2>
						<p className="paragraph--medium">{quote.excludeKeywords}</p>
					</div>

					<div className={classes["image-container"]}>
						<img className={classes.image} src={quote.image.medium} alt={"quote"} />
						<h2 className={`${classes.source} heading-2--cap`}>{quote.title}</h2>
					</div>

					<h3 className={`${classes.label} heading-3`}>Full Quote</h3>

					<div className={classes.full}>
						<p className="paragraph--medium">{quote.quoteFull}</p>
					</div>
				</div>
			</div>

			{otherQuotesByAuthor && (
				<MoreBy text={`More by ${quote?.author.name}`} quotes={otherQuotesByAuthor} />
			)}

			{recommendQuotes && <MoreBy text={"You may also like..."} quotes={recommendQuotes} />}
		</div>
	);
};

export default QuoteDetail;

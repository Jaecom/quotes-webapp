import classes from "./QuoteDetail.module.scss";
import { useParams } from "react-router";
import quotes from "../../seeds/quoteData";

const QuoteDetail = () => {
	console.log("QuoteDetailModal");
	const { quoteId } = useParams();
	const quote = quotes.find((element) => element.id === quoteId);

	return (
		<div className={classes.background}>
			<div className={classes.content}>
				<div className={classes.info}>
					<h3 className="heading-4--bold">{quote.title}</h3>
					<h3 className="heading-4">{quote.author}</h3>
				</div>

				<div className={classes.key}>
					<p className={`paragraph--big ${classes["quotation-mark"]}`}>&ldquo;</p>
					<h2 className="paragraph--big">{quote.keywords}</h2>
					<p className="paragraph--medium">{quote.exlcudeKeywords}</p>
				</div>

				<div className={classes["image-container"]}>
					<img className={classes.image} src={quote.image} />
					<h2 className={`${classes.title} heading-2--cap`}>{quote.title}</h2>
				</div>

				{/* <div className={classes.break}></div> */}

				<h3 className={`${classes.label} heading-3`}>Full Quote</h3>

				<div className={classes.full}>
					<p className="paragraph--medium">{quote.quoteFull}</p>
				</div>
			</div>
		</div>
	);
};

export default QuoteDetail;

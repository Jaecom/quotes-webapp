import classes from "./QuoteDetail.module.scss";
import MoreBy from "./MoreBy";
import QuoteDetailSideBar from "./QuoteDetailSideBar";

interface Props {
	quote: Quote;
	otherQuotesByAuthor: Quote[] | null | undefined;
	recommendQuotes: Quote[] | null | undefined;
	onQuoteSave: () => void;
	onQuoteLike: () => void;
	isLiked: boolean;
}

const QuoteDetail = (props: Props) => {
	const { quote, otherQuotesByAuthor, recommendQuotes, onQuoteLike, onQuoteSave, isLiked } = props;
	const text = quote.text.full.split(quote.text.short);

	return (
		<div>
			<div className={classes.grid}>
				<div className={classes["top-background"]}></div>
				<div className={classes.top}>
					<div className={classes.profile}>
						<div className={classes["profile-image"]}>
							<img
								src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
								alt="user"
							/>
						</div>
						<div className={classes["profile-detail"]}>
							<p className="heading-5" style={{ fontWeight: "700" }}>
								AvidReader123
							</p>
							<p className="heading-5">2 quotes | 5 collections</p>
						</div>
					</div>
					<div className={classes.control}>
						<QuoteDetailSideBar
							onQuoteLike={onQuoteLike}
							onQuoteSave={onQuoteSave}
							isLiked={isLiked}
							mobile
						/>
						<div className={classes.follow}>Follow</div>
					</div>
				</div>

				<div className={classes.sidebar}>
					<QuoteDetailSideBar
						onQuoteLike={onQuoteLike}
						onQuoteSave={onQuoteSave}
						isLiked={isLiked}
					/>
				</div>

				<div className={classes.info}>
					<h4 className="heading-4--bold">{quote.title}</h4>
					<h4 className="heading-4">{quote.author.name}</h4>
				</div>

				<h3 className={`${classes["label-key"]} heading-3`}>Key&nbsp;Quote</h3>

				<div className={classes.keyquote}>
					<h2 className="paragraph--big">{quote.text.keywords}</h2>
					<p className={`${classes.keyword} paragraph--medium`}>{quote.text.noKeywords}</p>
				</div>
				<div className={classes.genre}>
					<h2 className="heading-3">genre</h2>
					<h4 className="heading-4">{quote.genre}</h4>
				</div>

				<div className={classes.image}>
					<img src={quote.image.medium} alt={"quote"} />
				</div>

				<h3 className={`${classes["label-full"]} heading-3`}>Full&nbsp;Quote</h3>

				<div className={classes["full-quote"]}>
					<p className="paragraph--medium">
						{text[0]}
						<mark>{quote.text.short}</mark>
						{text[1]}
					</p>
				</div>
			</div>

			{otherQuotesByAuthor && otherQuotesByAuthor.length > 0 && (
				<MoreBy text={`More by ${quote?.author.name}`} quotes={otherQuotesByAuthor} />
			)}

			{recommendQuotes && <MoreBy text={"You may also like..."} quotes={recommendQuotes} />}
		</div>
	);
};

export default QuoteDetail;

import Card from "../UI/Card";
import classes from "./QuoteItem.module.scss";
import { Link } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";

const QuoteItem = (props) => {
	const { quote, totalLikes, isLiked, onQuoteLike } = props;
	const linkStateBackground = useLinkStateBackground();

	return (
		<div>
			<Link
				key={quote.id}
				to={{
					pathname: `/quotes/${quote.id}`,
					state: linkStateBackground,
				}}
			>
				<Card>
					<div className={classes.wrapper}>
						<div className={classes.container}>
							<div className={classes.main}>
								<div className={classes.content}>
									<p className={`${classes.quote} paragraph--small`}>
										{quote.previewQuote}&hellip;
									</p>
								</div>
								<div className={classes["image-wrapper"]}>
									<img src={quote.image} alt="quote" />
								</div>
							</div>
						</div>
					</div>
				</Card>
			</Link>

			<div className={`${classes.details}`}>
				<div className={classes.source}>
					<Link className="heading-4--bold" to={`/title/${quote.source}`}>
						{quote.source}
					</Link>
					<Link className="heading-5" to={`/authors/${quote.author.authorObject}`}>
						{quote.author.name}
					</Link>
				</div>
				<div className={classes.extra}>
					<div onClick={onQuoteLike.bind(null, quote.id)}>
						<svg className={`${classes.bookmark} ${isLiked && classes["bookmark--filled"]}`}>
							<use href={sprite + "#icon-bookmark"} />
						</svg>
					</div>
					<div className="heading-5">{totalLikes}</div>
				</div>
			</div>
		</div>
	);
};

export default QuoteItem;

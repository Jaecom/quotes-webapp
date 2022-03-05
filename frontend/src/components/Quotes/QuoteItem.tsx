import classes from "./QuoteItem.module.scss";
import { Link } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";

interface Props {
	quote: Quote;
	totalLikes: number;
	isLiked: boolean;
	onQuoteLike: (quoteId: string) => void;
	addToCollection: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const QuoteItem = (props: Props) => {
	const { quote, totalLikes, isLiked, onQuoteLike, addToCollection } = props;
	const linkStateBackground = useLinkStateBackground();

	return (
		<div>
			<Link
				to={{
					pathname: `/quotes/${quote._id}`,
					state: linkStateBackground,
				}}
			>
				<div className={classes.wrapper}>
					<div className={classes.main}>
						<div className={classes.content}>
							<p className="paragraph--small">{quote.text.preview}&hellip;</p>
							<div className={classes["plus-box"]} onClick={addToCollection}>
								<svg className={classes.plus}>
									<use href={sprite + "#icon-plus"} />
								</svg>
							</div>
						</div>
						<div className={classes["image-wrapper"]}>
							<img src={quote.image.thumbnail} alt="quote" loading="lazy" />
						</div>
					</div>
				</div>
			</Link>

			<div className={`${classes.details}`}>
				<div className={classes.title}>
					<Link className="heading-4--bold" to={`/title/${quote.title}`}>
						{quote.title}
					</Link>
					<Link className="heading-5" to={`/authors/${quote.author.authorObject}`}>
						{quote.author.name}
					</Link>
				</div>
				<div className={classes.extra} onClick={onQuoteLike.bind(null, quote._id)}>
					<svg className={`${classes.bookmark} ${isLiked && classes["bookmark--filled"]}`}>
						<use href={sprite + "#icon-bookmark"} />
					</svg>
					<div className="heading-5">{totalLikes}</div>
				</div>
			</div>
		</div>
	);
};

export default QuoteItem;

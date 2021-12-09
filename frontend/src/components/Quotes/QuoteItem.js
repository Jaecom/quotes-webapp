import Card from "../UI/Card";
import classes from "./QuoteItem.module.scss";
import "../../assets/styles/main.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import sprite from "../../assets/sprite.svg";

const QuoteItem = (props) => {
	const location = useLocation();
	const quote = props.quote;

	return (
		<div>
			<Link
				key={quote.id}
				to={{
					pathname: `/quotes/${quote.id}`,
					//set or pass on background location
					state: location.pathname === "/" ? { background: location } : location.state,
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
					<Link className="heading-5" to={`/author/${quote.author.authorObject}`}>
						{quote.author.name}
					</Link>
				</div>
				<div className={classes.extra}>
					<svg className={classes.bookmark}>
						<use href={sprite + "#icon-bookmark"} />
					</svg>
					<div className="heading-5">5</div>
				</div>
			</div>
		</div>
	);
};

export default QuoteItem;

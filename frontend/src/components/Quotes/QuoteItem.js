import Card from "../UI/Card";
import classes from "./QuoteItem.module.scss";
import "../../assets/styles/main.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const QuoteItem = (props) => {
	const location = useLocation();
	const quote = props.quote;

	const previewQuote = quote.quoteShort
		.split(" ")
		.filter((element, index) => index < 15)
		.join(" ");

	return (
		<div>
			<Link
				key={quote.id}
				to={{
					pathname: `/quotes/${quote.id}`,
					state:
						location.pathname === "/"
							? { background: location }
							: location.state?.background
							? location.state
							: null,
				}}
			>
				<Card>
					<div className={classes.wrapper}>
						<div className={classes.main}>
							<div className={classes.content}>
								<p className={`${classes.text} paragraph--small`}>{previewQuote}&hellip;</p>
							</div>
							<div className={classes.image}>
								<img src={quote.image} alt="quote" />
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

				<div className="heading-5">+4</div>
			</div>
		</div>
	);
};

export default QuoteItem;

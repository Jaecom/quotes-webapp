import Card from "../UI/Card";
import classes from "./QuoteItem.module.scss";
import "../../assets/styles/main.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const QuoteItem = (props) => {
	const location = useLocation();
	const quote = props.quote;

	return (
		<div>
			<Link
				key={quote.id}
				to={{ pathname: `/quotes/${quote.id}`, state: { background: location } }}
			>
				<Card>
					<div className={classes.wrapper}>
						<div className={classes.main}>
							<div className={classes.content}></div>
							<div className={classes.image}>
								<img src={quote.image} />
							</div>
						</div>
					</div>
				</Card>
				
			</Link>
			<div className={`${classes.details}`}>
				<div className={classes.source}>
					<Link className="heading-4--bold" to={`/title/${quote.title}`}>{quote.title}</Link>
					<Link className="heading-5" to={`/author/${quote.author}`}>{quote.author}</Link>
				</div>

				<div className="heading-5">+4</div>
			</div>
		</div>
	);
};

export default QuoteItem;

import classes from "./QuoteListBanner.module.scss";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";

const QuoteListBanner = (props) => {
	const { quote } = props;

	const linkStateBackground = useLinkStateBackground();

	return (
		<div className={classes["grid-wrapper"]}>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					<h3 className={`heading-3 ${classes.author}`}>{quote.author.name}</h3>
					<p className="paragraph--medium">{quote.quoteShort}</p>
					<Link
						className={classes.link}
						to={{ pathname: `/quotes/${quote.id}`, state: linkStateBackground }}
					>
						<Button fill>View Quote</Button>
					</Link>
					<p className={`paragraph--big ${classes["double-quote"]}`}>&#8221;</p>
				</div>
			</div>
		</div>
	);
};

export default QuoteListBanner;

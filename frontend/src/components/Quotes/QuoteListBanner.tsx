import classes from "./QuoteListBanner.module.scss";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";

const QuoteListBanner = (props: { quote: Quote }) => {
	const { quote } = props;

	const linkStateBackground = useLinkStateBackground();

	return (
		<div className={classes["grid-wrapper"]}>
			<Link
				className={classes.wrapper}
				to={{ pathname: `/quotes/${quote._id}`, state: linkStateBackground }}
			>
				<div className={classes.container}>
					<div className={classes.content}>
						<h3 className="heading-3">{quote.author.name}</h3>
						<p className="paragraph--medium">{quote.text.short}</p>
						<Button fill>View Quote</Button>
					</div>
					<p className={`paragraph--big ${classes["double-quote"]}`}>&#8221;</p>
				</div>
			</Link>
		</div>
	);
};

export default QuoteListBanner;

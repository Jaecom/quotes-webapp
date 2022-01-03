import classes from "./QuoteListBanner.module.scss";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";

const QuoteListBanner = (props) => {
	const { quote } = props;
	
	const linkStateBackground = useLinkStateBackground();

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<h3 className={classes.author}>{quote.author.name}</h3>
				<p className={classes.paragraph}>{quote.quoteShort}</p>
				<Link
					className={classes.link}
					to={{ pathname: `/quotes/${quote.id}`, state: linkStateBackground }}
				>
					<Button highlight>View Quote</Button>
				</Link>
				<p className={classes["double-quote"]}>&#8221;</p>
			</div>
		</div>
	);
};

export default QuoteListBanner;

import classes from "./PageNotFound.module.scss";
import "../../assets/styles/_typography.scss";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

const PageNotFound = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<h2 className="heading-3">Whoops! Looks like we can't find that page</h2>
				<div className={classes["error-code"]}>404</div>
				<Link to="/">
					<span>
						<Button highlight>Back to Quotes!</Button>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;

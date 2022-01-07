import classes from "./CollectionItem.module.scss";
import { Link } from "react-router-dom";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";
const CollectionItem = (props) => {
	const { collection } = props;

	const backgroundState = useLinkStateBackground();

	return (
		<Link to={{ pathname: `/collections/${collection._id}`, state: backgroundState }}>
			<div className={classes["grid-item"]}>
				<div className={classes["grid-content"]}>
					<div className={classes.wrapper}>
						<h3 className="heading-3">{collection.name}</h3>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CollectionItem;

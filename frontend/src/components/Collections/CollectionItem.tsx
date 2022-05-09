import classes from "./CollectionItem.module.scss";
import { Link } from "react-router-dom";
import useLinkStateBackground from "../../hooks/useLinkStateBackground";
import sprite from "../../assets/sprite.svg";
import type { Collection } from "data-type";
import { MouseEvent } from "react";

interface Props {
	collection: Collection;
	onOptionsClick: (e: MouseEvent, collectionId: string) => void;
	onOptionBlur: () => void;
}

const CollectionItem = (props: Props) => {
	const { collection, onOptionsClick, onOptionBlur } = props;

	const backgroundState = useLinkStateBackground();

	return (
		<Link
			to={{
				pathname: `/collections/${collection._id}`,
				state: backgroundState,
			}}
		>
			<div className={classes["grid-item"]}>
				<div className={classes["grid-content"]}>
					<div className={classes.container}>
						<h3 className="heading-3">{collection.name}</h3>
						<div>
							<div
								className={classes.option}
								onClick={(e) => onOptionsClick(e, collection._id)}
								onBlur={onOptionBlur}
								//allows div to be focused and unfocused
								tabIndex={0}
							>
								<svg>
									<use href={sprite + "#icon-dots-three-vertical"} />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CollectionItem;

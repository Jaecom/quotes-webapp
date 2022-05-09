import classes from "./OptionModal.module.scss";
import ReactDOM from "react-dom";
import sprite from "../../assets/sprite.svg";

interface Props {
	position: [number, number, string];
}

const OptionModal = (props: Props) => {
	const { position } = props;
	const [posX, posY, collectionId] = position;

	const editCollectionHandler = () => {
		console.log(collectionId);
	};

	return (
		<>
			{ReactDOM.createPortal(
				<div className={classes.container} style={{ left: posX, top: posY }}>
					<ul className={classes.list}>
						<li className="heading-nav" onMouseDown={editCollectionHandler}>
							<svg>
								<use href={sprite + "#icon-create"} />
							</svg>
							Edit Collection
						</li>
						<li className="heading-nav">
							<svg>
								<use href={sprite + "#icon-delete"} />
							</svg>
							Delete Collection
						</li>
					</ul>
				</div>,
				document.getElementById("modal")!
			)}
		</>
	);
};

export default OptionModal;

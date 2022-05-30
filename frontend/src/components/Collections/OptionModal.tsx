import classes from "./OptionModal.module.scss";
import ReactDOM from "react-dom";
import sprite from "../../assets/sprite.svg";
import { useEffect } from "react";

interface Props {
	position: [number, number, string];
	onEditClick: (collectionID: string) => void;
	onDeleteClick: (collectionId: string) => void;
}

const OptionModal = (props: Props) => {
	const { position } = props;
	const [posX, posY, collectionId] = position;

	//disable scroll when options are open
	useEffect(() => {
		const disableScrolling = () => {
			const x = window.scrollX;
			const y = window.scrollY;

			window.onscroll = function () {
				window.scrollTo(x, y);
			};
		};

		const enableScrolling = () => {
			window.onscroll = function () {};
		};

		disableScrolling();

		return () => {
			enableScrolling();
		};
	}, []);

	return (
		<>
			{ReactDOM.createPortal(
				<div className={classes.container} style={{ left: posX, top: posY }}>
					<ul className={classes.list}>
						<li
							className="heading-nav"
							onMouseDown={() => props.onEditClick(collectionId)}
						>
							<svg>
								<use href={sprite + "#icon-create"} />
							</svg>
							Edit Collection
						</li>
						<li
							className="heading-nav"
							onMouseDown={() => props.onDeleteClick(collectionId)}
						>
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

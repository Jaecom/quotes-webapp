import { useEffect } from "react";

import classes from "./CollectionList.module.scss";
import sprite from "../../assets/sprite.svg";

import CollectionItemContainer from "./CollectionItemContainer";
import CreateCollectionModal from "./CreateCollection/CreateCollectionModal";
import Button from "../UI/Button";
import useModal from "../../hooks/useModal";

const CollectionList = (props) => {
	const { collections, closeAfterCreate } = props;
	const [isModalOpen, openModal, closeModal] = useModal();

	useEffect(() => {
		//when closeAfterCreate changes
		closeModal();
	}, [closeAfterCreate, closeModal]);

	return (
		<>
			{isModalOpen && (
				<CreateCollectionModal onAddCollection={props.onAddCollection} onClose={closeModal} />
			)}

			<div className={classes.wrapper}>
				<Button className={classes.button} onClick={openModal} fill>
					<svg className={classes.plus}>
						<use href={sprite + "#icon-plus"} />
					</svg>
				</Button>

				<div className={classes.grid}>
					{collections &&
						collections.map((collection) => (
							<CollectionItemContainer key={collection._id} collection={collection} />
						))}
				</div>
			</div>
		</>
	);
};

export default CollectionList;

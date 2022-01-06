import { useEffect, useState } from "react";

import classes from "./CollectionList.module.scss";
import sprite from "../../assets/sprite.svg";

import CollectionItemContainer from "./CollectionItemContainer";
import AddCollectionModal from "./AddCollectionModal";
import Button from "../UI/Button";

const CollectionList = (props) => {
	const { collections, closeAfterCreate } = props;
	const [isModalOpen, setisModalOpen] = useState(false);

	const openModal = () => {
		setisModalOpen(true);
	};

	const closeModal = () => {
		setisModalOpen(false);
	};

	useEffect(() => {
		//when closeAfterCreate changes
		setisModalOpen(false);
	}, [closeAfterCreate]);

	return (
		<>
			{isModalOpen && (
				<AddCollectionModal onAddCollection={props.onAddCollection} onClose={closeModal} />
			)}

			<div className={classes.wrapper}>
				<Button className={classes.button} onClick={openModal} highlight>
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

import { useState } from "react";

import classes from "./CollectionList.module.scss";
import sprite from "../../assets/sprite.svg";

import CollectionItemContainer from "./CollectionItemContainer";
import Button from "../UI/Button";
import useModal from "../../hooks/useModal";
import type { Collection } from "data-type";
import OptionModal from "./OptionModal";

interface Props {
	collections: Collection[];
	openCreate: () => void;
	onEditClick: (collectionId: string) => void;
}

const CollectionList = (props: Props) => {
	const { collections, openCreate, onEditClick } = props;
	const [isOptionOpen, openOptions, closeOptions] = useModal();
	const [modalPos, setModalPos] = useState<[number, number, string]>([
		0,
		0,
		"",
	]);
	const onOptionsClickHandler = (e: React.MouseEvent, collectionId: string) => {
		e.preventDefault();

		setModalPos([e.clientX, e.clientY, collectionId]);

		if (!isOptionOpen) {
			openOptions();
		}
	};

	const onOptionBlur = () => {
		closeOptions();
	};

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.grid}>
					{collections &&
						collections.map((collection: Collection) => (
							<CollectionItemContainer
								key={collection._id}
								collection={collection}
								onOptionsClick={onOptionsClickHandler}
								onOptionBlur={onOptionBlur}
							/>
						))}
				</div>

				<Button className={classes.button} onClick={openCreate} fill>
					<svg className={classes.plus}>
						<use href={sprite + "#icon-plus"} />
					</svg>
				</Button>
			</div>

			{isOptionOpen && <OptionModal position={modalPos} onEditClick={onEditClick}/>}
		</>
	);
};

export default CollectionList;

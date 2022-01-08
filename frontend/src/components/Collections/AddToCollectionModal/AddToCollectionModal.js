import classes from "./AddToCollectionModal.module.scss";

import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";

import AddToCollectionItem from "./AddToCollectionItem";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import AddCollectionForm from "../AddCollectionForm";

const AddToCollectionModal = (props) => {
	const [collections, setCollections] = useState();
	const [isCreateCollectionPage, setIsCreateCollectionPage] = useState(false);

	const [sendRequest] = useHttp();
	const { quoteId } = props;

	useEffect(() => {
		if (isCreateCollectionPage) {
			return;
		}

		sendRequest(
			{
				url: "http://localhost:5000/api/collections",
				method: "GET",
				credentials: "include",
			},
			(data) => {
				setCollections(data);
			}
		);
	}, [sendRequest, isCreateCollectionPage]);

	const openCreateCollectionPage = () => {
		setIsCreateCollectionPage(true);
	};

	const closeCreateCollectionPage = () => {
		setIsCreateCollectionPage(false);
	};

	return (
		<Modal onClose={props.onClose} center top>
			<Card>
				{!isCreateCollectionPage && (
					<div className={classes.wrapper}>
						<h2 className={classes.heading}>Add to Collection</h2>
						<ul className={classes.list}>
							{collections &&
								collections.map((collection) => (
									<AddToCollectionItem
										key={collection._id}
										collection={collection}
										quoteId={quoteId}
									/>
								))}
						</ul>
						<div className={classes.buttons}>
							<Button highlight onClick={props.onClose}>Done</Button>
							<Button outline onClick={openCreateCollectionPage}>
								Create Collection
							</Button>
						</div>
					</div>
				)}
				{isCreateCollectionPage && (
					<AddCollectionForm
						onAddCollection={closeCreateCollectionPage}
						onCancel={closeCreateCollectionPage}
					/>
				)}
			</Card>
		</Modal>
	);
};

export default AddToCollectionModal;

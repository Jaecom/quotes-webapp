import Button from "components/UI/Button";
import useHttp from "hooks/useHttp";
import classes from "./DeleteCollectionContainer.module.scss";
import { deleteCollection } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

interface Props {
	onClose: () => void;
	collectionId: string;
}

const DeleteCollectionContainer = (props: Props) => {
	const { onClose, collectionId } = props;
	const [sendRequest, loading, error] = useHttp();
	const [done, setDone] = useState(false);
	const dispatch = useDispatch();

	const deleteCollectionHandler = () => {
		sendRequest(
			{
				url: `/api/collections/${collectionId}`,
				method: "DELETE",
				credentials: "include",
			},
			(data) => {
				dispatch(deleteCollection(data.collections));
				setDone(true);
			}
		);
	};

	//close modal after dispatch updates
	useEffect(() => {
		if (done) return onClose();

		return () => {
			setDone(false);
		};
	}, [done]);

	return (
		<div className={classes.container}>
			<div className={classes.prompt}>
				<p className={classes.title}>
					Do you wish to delete the following collection?
				</p>
				<p className="heading-4">
					You will not be able to retrieve your collection after you delete.
				</p>
			</div>
			<div className={classes.control}>
				<Button fill onClick={deleteCollectionHandler}>
					Delete
				</Button>
				<Button outline onClick={onClose}>
					Cancel
				</Button>
			</div>
		</div>
	);
};

export default DeleteCollectionContainer;

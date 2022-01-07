import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";

import { likeQuote, dislikeQuote } from "../../store/quoteSlice";
import QuoteItem from "./QuoteItem";
import LoginModal from "../Auth/LoginModal";
import useModal from "../../hooks/useModal";

const QuoteItemContainer = (props) => {
	const { quote, localLikeData } = props;

	const dispatch = useDispatch();
	const { userId, isLoggedIn } = useContext(AuthContext);

	const [sendRequest] = useHttp();
	const [isModalOpen, openModal, closeModal] = useModal(false);


	const isLikedInitial = !!quote.likes.users.includes(userId);

	//if localLike data present from parent,
	// use locallike variables
	const isLiked = localLikeData?.isLikedLocal ?? isLikedInitial;
	const likeTotal = localLikeData?.totalLikesLocal ?? quote.likes.total;

	const quoteLikeHandler = (quoteId) => {
		if (!isLoggedIn) {
			return openModal();
		}

		sendRequest(
			{
				url: `http://localhost:5000/api/quotes/${quoteId}/toggleLike`,
				method: "PATCH",
				body: JSON.stringify({ quoteId }),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			},
			(data) => {
				//let parent run custom code before dispatching to redux
				localLikeData?.handleLike();

				isLiked
					? dispatch(dislikeQuote({ quoteId, userId }))
					: dispatch(likeQuote({ quoteId, userId }));
			}
		);
	};

	return (
		<>
			{isModalOpen && <LoginModal onClose={closeModal} />}
			<QuoteItem
				key={quote.id}
				quote={quote}
				onQuoteLike={quoteLikeHandler}
				totalLikes={likeTotal}
				isLiked={isLiked}
			/>
		</>
	);
};

export default React.memo(QuoteItemContainer);

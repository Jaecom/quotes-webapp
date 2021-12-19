import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";

import { likeQuote, dislikeQuote } from "../../store/quoteSlice";
import QuoteItem from "./QuoteItem";
import LoginModal from "../Auth/LoginModal";
import useModal from "../../hooks/useModal";

const QuoteItemContainer = (props) => {
	const { quote, localLikeData } = props;

	const history = useHistory();
	const dispatch = useDispatch();
	const { userId, isLoggedIn, token } = useContext(AuthContext);

	const isLikedGlobal = quote.likes.users.includes(userId);
	const [sendRequest, isLoading, error] = useHttp();

	const [isLoginModalOpen, openModal, closeModal] = useModal(false);

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
					Authorization: "Bearer " + token,
				},
			},
			(data) => {
				//let parent handle if localLikeData present
				//for custom handling & updating UI
				localLikeData?.interceptLike();

				//runs when parent does not handle
				isLikedGlobal
					? dispatch(dislikeQuote({ quoteId, userId }))
					: dispatch(likeQuote({ quoteId, userId }));
			}
		);
	};

	return (
		<>
			{isLoginModalOpen && <LoginModal onClose={closeModal} />}
			<QuoteItem
				key={quote.id}
				quote={quote}
				onQuoteLike={quoteLikeHandler}
				totalLikes={localLikeData?.totalLikesLocal ?? quote.likes.total}
				isLiked={localLikeData?.isLikedLocal ?? isLikedGlobal}
			/>
		</>
	);
};

export default React.memo(QuoteItemContainer);

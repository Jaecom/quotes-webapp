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
				//let parent run custom code before dispatching to redux
				localLikeData?.handleLike();

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

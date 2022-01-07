import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";

import { likeQuote, dislikeQuote } from "../../store/quoteSlice";
import QuoteItem from "./QuoteItem";
import LoginModal from "../Auth/LoginModal";
import useModal from "../../hooks/useModal";

const QuoteItemContainer = (props) => {
	const { quote, local } = props;

	const dispatch = useDispatch();
	const { userId, isLoggedIn } = useContext(AuthContext);
	const [sendRequest] = useHttp();
	const [isModalOpen, openModal, closeModal] = useModal(false);

	const isLikedGlobal = !!quote.likes.users.includes(userId);
	const totalLikesGlobal = quote.likes.total;

	const [totalLikesLocal, setTotalLikesLocal] = useState(quote.likes.total);
	const [isLikedLocal, setIsLikedLocal] = useState(isLikedGlobal);

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
				if (isLikedLocal) {
					setIsLikedLocal(false);
					setTotalLikesLocal((likes) => likes - 1);
					dispatch(dislikeQuote({ quoteId, userId }));
				} else {
					setIsLikedLocal(true);
					setTotalLikesLocal((likes) => likes + 1);
					dispatch(likeQuote({ quoteId, userId }));
				}
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
				totalLikes={local ? totalLikesLocal : totalLikesGlobal}
				isLiked={local ? isLikedLocal : isLikedGlobal}
			/>
		</>
	);
};

export default React.memo(QuoteItemContainer);

import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";
import useModal from "../../hooks/useModal";
import { likeQuote, dislikeQuote } from "../../store/quoteSlice";

import QuoteItem from "./QuoteItem";
import LoginModal from "../Auth/LoginModal";
import AddToCollectionModal from "../Collections/AddToCollection/AddToCollectionModal";

const QuoteItemContainer = (props) => {
	const { quote, local } = props;

	const dispatch = useDispatch();
	const { userId, isLoggedIn } = useContext(AuthContext);
	const [sendRequest] = useHttp();
	const [isLoginModalOpen, openLoginModal, closeLoginModal] = useModal(false);
	const [isCollectionModalOpen, openCollectionModal, closeCollectionModal] = useModal(false);

	const isLikedGlobal = !!quote.likes.users.includes(userId);
	const totalLikesGlobal = quote.likes.total;

	const [totalLikesLocal, setTotalLikesLocal] = useState(quote.likes.total);
	const [isLikedLocal, setIsLikedLocal] = useState(isLikedGlobal);

	const quoteLikeHandler = (quoteId) => {
		if (!isLoggedIn) {
			return openLoginModal();
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

	const onAddToCollectionModal = (event) => {
		event.preventDefault();

		if (!isLoggedIn) {
			return openLoginModal();
		}

		return openCollectionModal();
	};

	return (
		<>
			{isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
			{isCollectionModalOpen && (
				<AddToCollectionModal quoteId={quote.id} onClose={closeCollectionModal} top />
			)}
			<QuoteItem
				quote={quote}
				onQuoteLike={quoteLikeHandler}
				totalLikes={local ? totalLikesLocal : totalLikesGlobal}
				isLiked={local ? isLikedLocal : isLikedGlobal}
				addToCollection={onAddToCollectionModal}
			/>
		</>
	);
};

export default React.memo(QuoteItemContainer);

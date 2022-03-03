import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";
import useModal from "../../hooks/useModal";
import { likeQuote, dislikeQuote } from "../../store/userSlice";

import QuoteItem from "./QuoteItem";
import LoginModal from "../Auth/LoginModal";
import AddToCollectionModal from "../Collections/AddToCollection/AddToCollectionModal";

interface Props {
	quote: Quote;
}
const QuoteItemContainer = (props: Props) => {
	const { quote } = props;
	const { isLoggedIn } = useContext(AuthContext);
	const { likedQuotes } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();

	const [sendRequest, isLoading] = useHttp();
	const [isLoginModalOpen, openLoginModal, closeLoginModal] = useModal();
	const [isCollectionModalOpen, openCollectionModal, closeCollectionModal] = useModal();

	const isLiked = likedQuotes.includes(quote.id);
	const [totalLikes, setTotalLikes] = useState<number>(quote.likes.total);

	const quoteLikeHandler = (quoteId: string) => {
		if (!isLoggedIn) {
			return openLoginModal();
		}

		if (isLoading) return;

		sendRequest(
			{
				url: `/api/quotes/${quoteId}/toggleLike`,
				method: "PATCH",
				body: JSON.stringify({ quoteId }),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			},
			(data) => {
				if (isLiked) {
					dispatch(dislikeQuote({ quoteId }));
					setTotalLikes((likes) => likes - 1);
				} else {
					dispatch(likeQuote({ quoteId }));
					setTotalLikes((likes) => likes + 1);
				}
			}
		);
	};

	const onAddToCollectionModal = (event: React.MouseEvent<HTMLDivElement>) => {
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
				<AddToCollectionModal quoteId={quote.id} onClose={closeCollectionModal} />
			)}
			<QuoteItem
				quote={quote}
				onQuoteLike={quoteLikeHandler}
				totalLikes={totalLikes}
				isLiked={isLiked}
				addToCollection={onAddToCollectionModal}
			/>
		</>
	);
};

export default React.memo(QuoteItemContainer);

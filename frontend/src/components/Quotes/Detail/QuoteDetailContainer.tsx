import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/useHttp";
import QuoteDetail from "./QuoteDetail";
import QuoteDetailPlaceholder from "./QuoteDetailPlaceholder";
import useModal from "../../../hooks/useModal";
import AddToCollectionModal from "../../Collections/AddToCollection/AddToCollectionModal";
import { useSelector, useDispatch } from "react-redux";
import { likeQuote, dislikeQuote } from "../../../store/userSlice";
import AuthContext from "../../../store/auth-context";
import LoginModal from "../../Auth/LoginModal";

const QuoteDetailContainer = () => {
	const [quote, setQuote] = useState<Quote | null>();
	const { quoteId } = useParams<{ quoteId: string }>();

	const dispatch = useDispatch();
	const { isLoggedIn } = useContext(AuthContext);

	const { likedQuotes } = useSelector((state: any) => state.user);
	const isLiked = likedQuotes.includes(quoteId);

	const [sendRequest, isLoading, error] = useHttp();
	const [sendLikeRequest, likeLoading, likeError] = useHttp();

	const [otherQuotesByAuthor, setOtherQuotesByAuthor] = useState<Quote[] | null>();
	const [recommendQuotes, setReommmenedQuotes] = useState<Quote[] | null>();

	const [isCollectionModalOpen, openCollectionModal, closeCollectionModal] = useModal();
	const [isLoginModalOpen, openLoginModal, closeLoginModal] = useModal();

	useEffect(() => {
		sendRequest({ url: `/api/quotes/${quoteId}` }, (data: { quote: any; recommended: Quote[] }) => {
			setQuote(data.quote);
			setReommmenedQuotes(data.recommended);

			const worksByAuthor = data.quote?.author.authorObject.quotes.filter(
				(quote: Quote) => quote._id !== quoteId
			);
			setOtherQuotesByAuthor(worksByAuthor);
		});

		return () => {
			setQuote(null);
			setReommmenedQuotes(null);
			setOtherQuotesByAuthor(null);
		};
	}, [sendRequest, quoteId]);

	const quoteLikeHandler = () => {
		if (!isLoggedIn) {
			return openLoginModal();
		}

		sendLikeRequest(
			{
				url: `/api/quotes/${quoteId}/toggleLike`,
				method: "PATCH",
				body: JSON.stringify({ quoteId }),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			},
			(data) => {}
		);

		isLiked ? dispatch(dislikeQuote({ quoteId })) : dispatch(likeQuote({ quoteId }));
	};

	return (
		<>
			{error && <div>Error...</div>}
			{isLoading && <QuoteDetailPlaceholder />}
			{isCollectionModalOpen && (
				<AddToCollectionModal onClose={closeCollectionModal} quoteId={quoteId} />
			)}
			{isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
			{quote && (
				<QuoteDetail
					quote={quote}
					otherQuotesByAuthor={otherQuotesByAuthor}
					recommendQuotes={recommendQuotes}
					onQuoteSave={isLoggedIn ? openCollectionModal : openLoginModal}
					onQuoteLike={quoteLikeHandler}
					isLiked={isLiked}
				/>
			)}
		</>
	);
};

export default QuoteDetailContainer;

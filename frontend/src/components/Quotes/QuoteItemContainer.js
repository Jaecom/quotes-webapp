import { useState, useContext } from "react";
import QuoteItem from "./QuoteItem";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";
import { useHistory } from "react-router-dom";
import React from "react";

import { useDispatch } from "react-redux";
import { likeQuote, dislikeQuote } from "../../store/quoteSlice";

const QuoteItemContainer = (props) => {
	const { quote } = props;

	const history = useHistory();
	const dispatch = useDispatch();
	const { userId, isLoggedIn, token } = useContext(AuthContext);

	const isLikedGlobal = quote.likes.users.includes(userId);
	const isLocationHome = history.location.pathname === "/";

	const [sendRequest, isLoading, error] = useHttp();

	const [isLikedLocal, setIsLikedLocal] = useState(!!quote.likes.users.includes(userId));
	const [totalLikesLocal, setTotalLikesLocal] = useState(quote.likes.total);

	const quoteLikeHandler = (quoteId) => {
		if (!isLoggedIn) {
			history.push({ pathname: "/login" });
			return;
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
				isLikedLocal
					? setTotalLikesLocal((total) => total - 1)
					: setTotalLikesLocal((total) => total + 1);

				setIsLikedLocal((isLocalLiked) => !isLocalLiked);

				isLikedGlobal
					? dispatch(dislikeQuote({ quoteId, userId }))
					: dispatch(likeQuote({ quoteId, userId }));
			}
		);
	};

	return (
		<QuoteItem
			key={quote.id}
			quote={quote}
			onQuoteLike={quoteLikeHandler}
			totalLikes={isLocationHome ? quote.likes.total : totalLikesLocal}
			isLiked={isLocationHome ? isLikedGlobal : isLikedLocal}
		/>
	);
};

export default React.memo(QuoteItemContainer);

import { useState, useContext } from "react";
import QuoteItem from "./QuoteItem";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";

const QuoteItemContainer = (props) => {
	const { quote } = props;
	const [sendRequest, isLoading, error] = useHttp();

	const authCtx = useContext(AuthContext);
	const [totalLikes, setTotalLikes] = useState(quote.likes.total);

	const [isLiked, setIsLiked] = useState(quote.likes.users.includes(authCtx.userId));

	const quoteLikeHandler = (quoteId) => {
		sendRequest(
			{
				url: `http://localhost:5000/api/quotes/${quoteId}/toggleLike`,
				method: "PATCH",
				body: JSON.stringify({ quoteId }),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authCtx.token,
				},
			},
			(data) => {
				setTotalLikes((previousTotal) => {
					if (isLiked) {
						return previousTotal - 1;
					}

					return previousTotal + 1;
				});

				setIsLiked((isLiked) => !isLiked);
			}
		);
	};

	return (
		<QuoteItem
			key={quote.id}
			quote={quote}
			onQuoteLike={quoteLikeHandler}
			totalLikes={totalLikes}
			isLiked={isLiked}
		/>
	);
};

export default QuoteItemContainer;

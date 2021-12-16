import { useState, useContext, useEffect } from "react";
import QuoteItem from "./QuoteItem";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";
import { useHistory } from "react-router-dom";

const QuoteItemContainer = (props) => {
	const { quote } = props;
	const [sendRequest, isLoading, error] = useHttp();

	const { userId, isLoggedIn, token } = useContext(AuthContext);
	const [totalLikes, setTotalLikes] = useState(quote.likes.total);
	const [isLiked, setIsLiked] = useState(!!quote.likes.users.includes(userId));

	const history = useHistory();

	useEffect(() => {
		if (!isLoggedIn) {
			setIsLiked(false);
		}
	}, [isLoggedIn]);

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
				setTotalLikes((previousTotal) => (isLiked ? previousTotal - 1 : previousTotal + 1));
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

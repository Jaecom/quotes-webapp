import { useState, useContext } from "react";
import QuoteItem from "./QuoteItem";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/useHttp";

const QuoteItemContainer = (props) => {
	const { quote } = props;
	const [sendRequest, isLoading, error] = useHttp();

	const authCtx = useContext(AuthContext);
	const [totalBookmarks, setTotalBookmarks] = useState(quote.userBookmarks.total);

	const [isBookmarked, setIsBookmarked] = useState(
		quote.userBookmarks.users.includes(authCtx.userId)
	);

	const quoteLikeHandler = (quoteId) => {
		console.log(quoteId);
	};

	return (
		<QuoteItem
			key={quote.id}
			quote={quote}
			onQuoteLike={quoteLikeHandler}
			totalBookmarks={totalBookmarks}
			isBookmarked={isBookmarked}
		/>
	);
};

export default QuoteItemContainer;

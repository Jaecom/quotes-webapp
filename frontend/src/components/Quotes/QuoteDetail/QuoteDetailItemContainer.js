import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import AuthContext from "../../../store/auth-context";
import { likeQuote, dislikeQuote } from "../../../store/quoteSlice";

import QuoteItemContainer from "../QuoteItemContainer";

const QuoteDetailItemContainer = (props) => {
	const { quote } = props;
	const { quoteId } = quote;
	const { userId } = useContext(AuthContext);
	const dispatch = useDispatch();

	const [isLikedLocal, setIsLikedLocal] = useState(!!quote.likes.users.includes(userId));
	const [totalLikesLocal, setTotalLikesLocal] = useState(quote.likes.total);

	const interceptLikeHandler = () => {
		isLikedLocal
			? setTotalLikesLocal((total) => total - 1)
			: setTotalLikesLocal((total) => total + 1);

		setIsLikedLocal((isLikedLocal) => !isLikedLocal);

		isLikedLocal
			? dispatch(dislikeQuote({ quoteId, userId }))
			: dispatch(likeQuote({ quoteId, userId }));
	};

	return (
		<QuoteItemContainer
			key={quoteId}
			quote={quote}
			localLikeData={{ isLikedLocal, totalLikesLocal, interceptLike: interceptLikeHandler }}
		/>
	);
};

export default QuoteDetailItemContainer;

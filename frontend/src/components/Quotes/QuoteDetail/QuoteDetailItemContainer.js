import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";
import QuoteItemContainer from "../QuoteItemContainer";
import React from "react";

const QuoteDetailItemContainer = (props) => {
	const { quote } = props;
	const { quoteId } = quote;
	const { userId } = useContext(AuthContext);

	const [isLikedLocal, setIsLikedLocal] = useState(!!quote.likes.users.includes(userId));
	const [totalLikesLocal, setTotalLikesLocal] = useState(quote.likes.total);

	const handleLikeHandler = () => {
		isLikedLocal
			? setTotalLikesLocal((total) => total - 1)
			: setTotalLikesLocal((total) => total + 1);

		setIsLikedLocal((isLikedLocal) => !isLikedLocal);
	};

	return (
		<QuoteItemContainer
			key={quoteId}
			quote={quote}
			localLikeData={{
				isLikedLocal,
				totalLikesLocal,
				handleLike: handleLikeHandler,
			}}
		/>
	);
};

export default React.memo(QuoteDetailItemContainer);

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/useHttp";
import LoadingPopup from "../../UI/Loading/LoadingPopup";
import QuoteDetail from "./QuoteDetail";

const QuoteDetailContainer = () => {
	const [quote, setQuote] = useState();
	const { quoteId } = useParams();

	const [sendRequest, isLoading, error] = useHttp();

	const [otherQuotesByAuthor, setOtherQuotesByAuthor] = useState();
	const [recommendQuotes, setReommmenedQuotes] = useState();

	useEffect(() => {
		sendRequest({ url: `/api/quotes/${quoteId}` }, (data) => {
			setQuote(data.quote);
			setReommmenedQuotes(data.recommended);

			const worksByAuthor = data.quote?.author.authorObject.quotes.filter(
				(element) => element.id !== quoteId
			);
			setOtherQuotesByAuthor(worksByAuthor);
		});

		return () => {
			setQuote(null);
			setReommmenedQuotes(null);
			setOtherQuotesByAuthor(null);
		};
	}, [sendRequest, quoteId]);

	return (
		<>
			{error && <div>Error...</div>}
			{isLoading && <LoadingPopup />}
			{quote && (
				<QuoteDetail
					quote={quote}
					otherQuotesByAuthor={otherQuotesByAuthor}
					recommendQuotes={recommendQuotes}
				/>
			)}
		</>
	);
};

export default QuoteDetailContainer;

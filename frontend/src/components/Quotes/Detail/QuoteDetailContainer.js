import { useState, useEffect, useRef } from "react";
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
		});
	}, [sendRequest, quoteId]);

	useEffect(() => {
		const worksByAuthor = quote?.author.authorObject.quotes.filter(
			(element) => element.id !== quote.id
		);
		setOtherQuotesByAuthor(worksByAuthor);
	}, [quote]);

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

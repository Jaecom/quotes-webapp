import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/useHttp";
import LoadingPopup from "../../UI/Loading/LoadingPopup";
import QuoteDetail from "./QuoteDetail";

const QuoteDetailContainer = () => {
	const [quote, setQuote] = useState<Quote | null>();
	const { quoteId } = useParams<{ quoteId: string }>();

	const [sendRequest, isLoading, error] = useHttp();

	const [otherQuotesByAuthor, setOtherQuotesByAuthor] = useState<Quote[] | null>();
	const [recommendQuotes, setReommmenedQuotes] = useState<Quote[] | null>();

	useEffect(() => {
		sendRequest({ url: `/api/quotes/${quoteId}` }, (data: { quote: any; recommended: Quote[] }) => {
			setQuote(data.quote);
			setReommmenedQuotes(data.recommended);

			const worksByAuthor = data.quote?.author.authorObject.quotes.filter(
				(quote: Quote) => quote.id !== quoteId
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

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/useHttp";
import LoadingPopup from "../../UI/Loading/LoadingPopup";
import QuoteDetail from "./QuoteDetail";
import MoreBy from "./MoreBy";

const QuoteDetailContainer = () => {
	const [quote, setQuote] = useState();
	const { quoteId } = useParams();

	const [sendRequest, isLoading, error] = useHttp();

	const [otherQuotesByAuthor, setOtherQuotesByAuthor] = useState();
	const [recommendQuotes, setReommmenedQuotes] = useState();

	useEffect(() => {
		sendRequest({ url: `http://localhost:5000/api/quotes/${quoteId}` }, (data) => {
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
			{quote && <QuoteDetail quote={quote} />}
			{otherQuotesByAuthor?.length > 0 && (
				<MoreBy text={`More by ${quote?.author.name}`} quotes={otherQuotesByAuthor} />
			)}
			{recommendQuotes?.length > 0 && (
				<MoreBy text={"You may also like..."} quotes={recommendQuotes} />
			)}
		</>
	);
};

export default QuoteDetailContainer;

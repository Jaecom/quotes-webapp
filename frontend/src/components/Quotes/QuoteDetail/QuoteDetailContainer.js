import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/useHttp";
import LoadingSpinner from "../../UI/LoadingSpinner";
import QuoteDetail from "./QuoteDetail";
import MoreBy from "./MoreBy";

const QuoteDetailContainer = () => {
	const [quote, setQuote] = useState();
	const { quoteId } = useParams();

	const [sendRequest, isLoading, error] = useHttp();

	const [otherQuotesByAuthor, setOtherQuotesByAuthor] = useState();
	const [recommendQuotes, setReommmenedQuotes] = useState();

	const processData = (data) => {
		console.log(data.quote);
		setQuote(data.quote);
		setReommmenedQuotes(data.recommended);
	};

	useEffect(() => {
		sendRequest({ url: `http://localhost:5000/api/quotes/${quoteId}` }, processData);
	}, [sendRequest, quoteId]);

	useEffect(() => {
		const quoteId = quote?.id;
		const worksByAuthor = quote?.author.authorObject.quotes.filter(
			(element) => element.id !== quoteId
		);
		setOtherQuotesByAuthor(worksByAuthor);
	}, [quote]);

	return (
		<>
			{error && <div>Error...</div>}
			{isLoading && <LoadingSpinner />}
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
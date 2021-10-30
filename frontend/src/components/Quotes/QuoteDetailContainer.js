import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/useHttp";
import QuoteDetail from "./QuoteDetail";

const QuoteDetailContainer = () => {
	console.log("QuoteDetailContainer");
	const [quote, setQuote] = useState();
	const { quoteId } = useParams();
	const [sendRequest, isLoading, error] = useHttp();

	const processData = (data) => {
		setQuote(data);
	};

	useEffect(() => {
		sendRequest({ url: `http://localhost:5000/api/quotes/${quoteId}` }, processData);
	}, [sendRequest, quoteId]);
	return (
		<>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error...</div>}
			{quote && <QuoteDetail quote={quote} />}
		</>
	);
};

export default QuoteDetailContainer;

import { useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import QuoteSearchNotFound from "./QuoteSearchNotFound";
import { useSelector, useDispatch } from "react-redux";
import { setInitialQuotes, addNextQuotes } from "../../store/quoteSlice";

const QuoteListContainer = (props) => {
	const history = useHistory();
	const searchWord = new URLSearchParams(history.location.search).get("search");

	const quoteBottomRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();

	const { quotes, isLastPage, page } = useSelector((state) => state.quote);
	const dispatch = useDispatch();

	const onScrolledBottom = useCallback(() => {
		if (isLastPage) {
			return;
		}

		const url = new URL("http://localhost:5000/api/quotes");
		searchWord && url.searchParams.append("search", searchWord);
		page && url.searchParams.append("page", page + 1);

		sendRequest(
			{
				url,
			},
			(data) => {
				dispatch(addNextQuotes({ ...data }));
			}
		);
	}, [searchWord, page, sendRequest, isLastPage, dispatch]);

	const [attachObserver, detachObserver] = useObserver(quoteBottomRef, onScrolledBottom);

	useEffect(() => {
		if (quotes && quotes.length !== 0) {
			attachObserver();
		}

		return () => {
			detachObserver();
		};
	}, [attachObserver, detachObserver, quotes]);

	useEffect(() => {
		const isSearchResultBackground = history.location.state?.background?.search;
		if (isSearchResultBackground) {
			console.log("Preventing http request");
			//don't request new data for background
			// when clicking quote item on search result
			return;
		}

		const url = new URL("http://localhost:5000/api/quotes");
		searchWord && url.searchParams.append("search", searchWord);

		sendRequest(
			{
				url,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
			}
		);
	}, [sendRequest, searchWord, history, dispatch]);

	return (
		<>
			{isLoading && <LoadingSpinner />}
			{error && <div>Error</div>}
			{quotes && quotes.length !== 0 && <QuoteList quotes={quotes} ref={quoteBottomRef} />}
			{!isLoading && !error && (!quotes || quotes.length === 0) && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

import { useRef, useCallback, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import QuoteSearchNotFound from "./QuoteSearchNotFound";

const initialState = {
	quotes: [],
	page: 1,
	isLastPage: false,
};

const quoteReducer = (state, action) => {
	switch (action.type) {
		case "LOAD_INITIAL_QUOTES": {
			const { quotes, isLastPage } = action.payload;
			return { ...initialState, quotes, isLastPage };
		}

		case "LOAD_NEXT_QUOTES": {
			const { quotes: newQuotes, isLastPage } = action.payload;
			return { ...state, quotes: state.quotes.concat(newQuotes), page: state.page + 1, isLastPage };
		}

		default:
			return state;
	}
};

const QuoteListContainer = (props) => {
	const history = useHistory();
	const searchWord = new URLSearchParams(history.location.search).get("search");

	const quoteBottomRef = useRef();
	const [sendRequest, isLoading, error] = useHttp();

	const [state, dispatch] = useReducer(quoteReducer, initialState);
	const { quotes, page, isLastPage } = state;

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
				dispatch({ type: "LOAD_NEXT_QUOTES", payload: { ...data } });
			}
		);
	}, [searchWord, page, sendRequest, isLastPage]);

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
		const isQuoteItemClicked = !!history.location.state?.background;
		if (isQuoteItemClicked) {
			//location.state is set when user clicks quoteItem
			//don't request data for background
			return;
		}

		const url = new URL("http://localhost:5000/api/quotes");
		searchWord && url.searchParams.append("search", searchWord);

		sendRequest(
			{
				url,
			},
			(data) => {
				dispatch({ type: "LOAD_INITIAL_QUOTES", payload: { ...data } });
			}
		);
	}, [sendRequest, searchWord, history]);

	return (
		<>
			{isLoading && <LoadingSpinner />}
			{error && <div>Error</div>}
			{quotes && quotes.length !== 0 && <QuoteList quotes={quotes} ref={quoteBottomRef} />}
			{!isLoading && (!quotes || quotes.length === 0) && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

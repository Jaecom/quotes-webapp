import { useRef, useCallback, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";

const initialState = {
	quotes: [],
	page: 1,
	isLastPage: false,
};

const quoteReducer = (state, action) => {
	switch (action.type) {
		case "NEXT_PAGE":
			const isLastPage = action.payload;

			if (!isLastPage) {
				return { ...state, page: state.page + 1 };
			}

			return state;

		case "RESET":
			return initialState;

		case "SHOW_QUOTE":
			const { quotes: newQuotes, isLastPage: lastPage } = action.payload;

			if (state.page === 1) {
				return { ...state, quotes: newQuotes, isLastPage: lastPage };
			}

			return { ...state, quotes: state.quotes.concat(newQuotes), isLastPage: lastPage };

		default:
			return state;
	}
};

const QuoteListContainer = () => {
	const history = useHistory();
	const searchWord = new URLSearchParams(history.location.search).get("search");
	const quoteBottomRef = useRef();

	const [sendRequest, isLoading, error] = useHttp();

	const [state, dispatch] = useReducer(quoteReducer, initialState);
	const { quotes, page, isLastPage } = state;

	const observerCallback = useCallback(() => {
		dispatch({ type: "NEXT_PAGE", payload: isLastPage });
	}, [isLastPage]);

	const [attachObserver, detachObserver] = useObserver(quoteBottomRef, observerCallback);

	useEffect(() => {
		const unlisten = history.listen((location, action) => {
			if (action === "PUSH" && location.search !== "") {
				//on query change reset
				dispatch({ type: "RESET" });
			}
		});
		attachObserver();

		return () => {
			detachObserver();
			unlisten();
		};
	}, [attachObserver, detachObserver, history]);

	useEffect(() => {
		sendRequest(
			{
				url: `http://localhost:5000/api/quotes?${
					searchWord ? `search=${searchWord}` : ""
				}&page=${page}`,
			},
			(data) => {
				dispatch({ type: "SHOW_QUOTE", payload: { ...data } });
			}
		);
	}, [page, sendRequest, searchWord]);

	return (
		<>
			<QuoteList quotes={quotes} />
			{error && <div>Error</div>}
			{isLoading && <div>Loading...</div>}
			{<div ref={quoteBottomRef}></div>}
		</>
	);
};

export default QuoteListContainer;

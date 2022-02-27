import { useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import QuoteSearchNotFound from "./QuoteSearchNotFound";
import { useSelector, useDispatch } from "react-redux";
import { setInitialQuotes, addNextQuotes } from "../../store/quoteSlice";

let scrollErrorCount = 0;

interface CustomHistory {
	background?: Location;
	noLoad?: boolean;
}

const QuoteListContainer = () => {
	const history = useHistory<CustomHistory>();
	const searchWord = new URLSearchParams(history.location.search).get("search");

	const [sendRequest, isLoading, error] = useHttp();
	const { quotes, isLastPage, page } = useSelector((state: any) => state.quote);
	const quoteBottomRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const onScrolledBottom = useCallback(
		(enableObserve, disableObserve) => {
			if (isLastPage) return;

			//stop observing before data load
			disableObserve();

			const urlParams = new URLSearchParams();
			searchWord && urlParams.append("search", searchWord);
			page && urlParams.append("page", page + 1);

			sendRequest(
				{
					url: `/api/quotes?${urlParams}`,
				},
				(data) => {
					dispatch(addNextQuotes({ ...data }));
					//resume observing after data load
					return enableObserve();
				},
				(error) => {
					scrollErrorCount++;
					if (scrollErrorCount < 4) return enableObserve();
				}
			);
		},
		[searchWord, page, sendRequest, isLastPage, dispatch]
	);

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
		scrollErrorCount = 0;
	}, []);

	useEffect(() => {
		if (history.location.state?.noLoad) return;

		const isSearchResultBackground = history.location.state?.background?.search;
		// //don't request new data for background
		// // when clicking quote item on search result
		if (isSearchResultBackground) return;

		const urlParams = new URLSearchParams();
		searchWord && urlParams.append("search", searchWord);

		sendRequest(
			{
				url: `/api/quotes?${urlParams}`,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
				if (history.action === "PUSH") window.scrollTo(0, 0);
			}
		);
	}, [sendRequest, searchWord, history, dispatch]);

	return (
		<>
			{error && <div>Error</div>}
			{quotes && quotes.length !== 0 && (
				<QuoteList quotes={quotes} quoteBottomRef={quoteBottomRef} loading={isLoading} />
			)}
			{!isLoading && !error && (!quotes || quotes.length === 0) && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

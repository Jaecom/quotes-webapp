import { useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import QuoteSearchNotFound from "./QuoteSearchNotFound";
import { useSelector, useDispatch } from "react-redux";
import { setInitialQuotes, addNextQuotes } from "../../store/quoteSlice";
import { QuoteListPlaceHolder } from "./QuotePlaceHolder";

let scrollErrorCount = 0;

interface CustomHistory {
	background?: Location;
	noLoad?: boolean;
}

const QuoteListContainer = () => {
	const history = useHistory<CustomHistory>();
	const searchWord = new URLSearchParams(history.location.search).get("search");

	const { quotes, isLastPage, page } = useSelector((state: any) => state.quote);
	const [sendRequestObs, isLoadingObs] = useHttp();
	const [sendRequestInit, isLoadingInit, errorInitial] = useHttp();
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

			sendRequestObs(
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
		[searchWord, page, sendRequestObs, isLastPage, dispatch]
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

		sendRequestInit(
			{
				url: `/api/quotes?${urlParams}`,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
				if (history.action === "PUSH") window.scrollTo(0, 0);
			}
		);
	}, [sendRequestInit, searchWord, history, dispatch]);

	return (
		<>
			{errorInitial && <div>Error</div>}
			{isLoadingInit && (
				<QuoteListPlaceHolder count={searchWord ? Math.floor(Math.random() * 10 + 1) : 20} />
			)}
			{quotes && quotes.length !== 0 && (
				<QuoteList quotes={quotes} quoteBottomRef={quoteBottomRef} loading={isLoadingObs} />
			)}
			{quotes && quotes.length === 0 && <QuoteSearchNotFound searchWord={searchWord} />}
		</>
	);
};

export default QuoteListContainer;

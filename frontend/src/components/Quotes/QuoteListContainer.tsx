import { useRef, useCallback, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import LoadingPopup from "../UI/Loading/LoadingPopup";
import QuoteSearchNotFound from "./QuoteSearchNotFound";
import { useSelector, useDispatch } from "react-redux";
import { setInitialQuotes, addNextQuotes } from "../../store/quoteSlice";

interface historyType extends RouteComponentProps {
	background: Location;
}

const QuoteListContainer = () => {
	const history = useHistory<historyType>();
	const searchWord = new URLSearchParams(history.location.search).get("search");

	const quoteBottomRef = useRef<HTMLDivElement>(null);
	const [sendRequest, isLoading, error] = useHttp();

	const { quotes, isLastPage, page } = useSelector((state: any) => state.quote);
	const dispatch = useDispatch();

	const onScrolledBottom = useCallback(() => {
		if (isLastPage) {
			return;
		}

		const urlParams = new URLSearchParams();
		searchWord && urlParams.append("search", searchWord);
		page && urlParams.append("page", page + 1);

		sendRequest(
			{
				url: `/api/quotes?${urlParams}`,
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

		const urlParams = new URLSearchParams();
		searchWord && urlParams.append("search", searchWord);

		sendRequest(
			{
				url: `/api/quotes?${urlParams}`,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
			}
		);
	}, [sendRequest, searchWord, history, dispatch]);

	return (
		<>
			{isLoading && <LoadingPopup />}
			{error && <div>Error</div>}
			{quotes && quotes.length !== 0 && (
				<QuoteList quotes={quotes} quoteBottomRef={quoteBottomRef} />
			)}
			{!isLoading && !error && (!quotes || quotes.length === 0) && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

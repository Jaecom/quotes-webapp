import { useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import useObserver from "../../hooks/useObserver";
import QuoteList from "./QuoteList";
import LoadingPopup from "../UI/Loading/LoadingPopup";
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
			{quotes && quotes.length !== 0 && <QuoteList quotes={quotes} ref={quoteBottomRef} />}
			{!isLoading && !error && (!quotes || quotes.length === 0) && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

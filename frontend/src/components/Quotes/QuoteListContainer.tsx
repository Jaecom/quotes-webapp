import QuoteList from "./QuoteList";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useCallback, useEffect } from "react";
import useObserver from "../../hooks/useObserver";
import useHttp from "../../hooks/useHttp";
import { addNextQuotes } from "../../store/quoteSlice";
import { useHistory } from "react-router-dom";

let scrollErrorCount = 0;

const QuoteListContainer = (props: { api: string }) => {
	const { api } = props;
	const history = useHistory();
	const { quotes, isLastPage, page } = useSelector((state: any) => state.quote);
	const dispatch = useDispatch();
	const quoteBottomRef = useRef<HTMLDivElement>(null);
	const [sendRequest, isLoading, error] = useHttp();

	const onScrolledBottom = useCallback(
		(enableObserve, disableObserve) => {
			console.log("bottom");
			if (isLastPage) return;

			//stop observing before data load
			disableObserve();

			const urlParams = new URLSearchParams(history.location.search);
			page && urlParams.append("page", page + 1);
			sendRequest(
				{
					url: `${api}?${urlParams}`,
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
		[page, sendRequest, isLastPage, dispatch, api, history]
	);

	const [attachObserver, detachObserver] = useObserver(quoteBottomRef, onScrolledBottom);

	useEffect(() => {
		if (quotes && quotes.length !== 0) {
			attachObserver();
		}

		return () => {
			detachObserver();
		};
	}, [quotes, detachObserver, attachObserver]);

	useEffect(() => {
		return () => {
			scrollErrorCount = 0;
		};
	}, []);

	return <QuoteList quotes={quotes} loading={isLoading} quoteBottomRef={quoteBottomRef} />;
};

export default QuoteListContainer;

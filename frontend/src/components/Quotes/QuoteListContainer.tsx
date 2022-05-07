import QuoteList from "./QuoteList";
import { useRef, useCallback, useEffect, useReducer } from "react";
import useObserver from "../../hooks/useObserver";
import useHttp from "../../hooks/useHttp";
import { useHistory } from "react-router-dom";
import { QuoteListPlaceHolder } from "../Quotes/QuotePlaceHolder";
import QuoteSearchNotFound from "./Search/QuoteSearchNotFound";
import { Quote } from "data-type";

let scrollErrorCount = 0;

interface QuoteState {
	quotes: Quote[];
	isLastPage: boolean;
	page: number;
}

type Action =
	| {
			type: "loadInitial";
			payload: QuoteState;
	  }
	| {
			type: "loadNext";
			payload: QuoteState;
	  };

const initialState = {
	quotes: [],
	isLastPage: false,
	page: 1,
};

const reducer = (current: QuoteState, action: Action): QuoteState => {
	switch (action.type) {
		case "loadInitial":
			return {
				...initialState,
				isLastPage: action.payload.isLastPage,
				page: 1,
				quotes: action.payload.quotes,
			};
		case "loadNext":
			return {
				...current,
				isLastPage: action.payload.isLastPage,
				page: current.page + 1,
				quotes: current.quotes.concat(action.payload.quotes),
			};
	}
};

const QuoteListContainer = (props: { api: string; search?: boolean }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { quotes, isLastPage, page } = state;
	const { api, search } = props;
	const history = useHistory();
	const quoteBottomRef = useRef<HTMLDivElement>(null);
	const [sendRequest, isLoading, error] = useHttp();
	const [sendRequestInit, isLoadingInit, errorInitial] = useHttp();
	const searchParams = history.location.search;
	const searchWord =
		new URLSearchParams(history.location.search).get("q") || "";

	const onScrolledBottom = useCallback(
		(enableObserve, disableObserve) => {
			console.log("bottom");
			if (isLastPage) return;

			//stop observing before data load
			disableObserve();

			const urlParams = new URLSearchParams(searchParams);
			page && urlParams.append("page", `${page + 1}`);
			sendRequest(
				{
					url: `${api}?${urlParams}`,
				},
				(data) => {
					dispatch({ type: "loadNext", payload: data });
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

	const [attachObserver, detachObserver] = useObserver(
		quoteBottomRef,
		onScrolledBottom
	);

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

	useEffect(() => {
		const urlParams = new URLSearchParams(searchParams);
		sendRequestInit(
			{
				url: `${api}?${urlParams}`,
			},
			(data) => {
				dispatch({ type: "loadInitial", payload: data });
			}
		);
	}, [searchParams]);

	return (
		<>
			{errorInitial && <div>Error</div>}
			{isLoadingInit && <QuoteListPlaceHolder count={20} />}
			{quotes && quotes.length !== 0 && (
				<QuoteList
					quotes={quotes}
					loading={isLoading}
					quoteBottomRef={quoteBottomRef}
				/>
			)}
			{search && quotes.length === 0 && (
				<QuoteSearchNotFound searchWord={searchWord} />
			)}
		</>
	);
};

export default QuoteListContainer;

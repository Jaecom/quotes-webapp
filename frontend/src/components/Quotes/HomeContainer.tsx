import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHttp";

import { useDispatch, useSelector } from "react-redux";
import { setInitialQuotes } from "../../store/quoteSlice";
import { QuoteListPlaceHolder } from "./QuotePlaceHolder";
import QuoteListContainer from "./QuoteListContainer";

interface CustomHistory {
	background?: Location;
	noLoad?: boolean;
}

const HomeContainer = () => {
	const history = useHistory<CustomHistory>();
	const [sendRequestInit, isLoadingInit, errorInitial] = useHttp();
	const dispatch = useDispatch();
	const { quotes } = useSelector((state: any) => state.quote);

	useEffect(() => {
		const urlParams = new URLSearchParams(history.location.search);
		sendRequestInit(
			{
				url: `/api/quotes?${urlParams}`,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
			}
		);
	}, [sendRequestInit, history, dispatch]);

	return (
		<>
			{errorInitial && <div>Error</div>}
			{isLoadingInit && <QuoteListPlaceHolder count={20} />}
			{quotes && quotes.length !== 0 && <QuoteListContainer api={"/api/quotes"} />}
		</>
	);
};

export default HomeContainer;

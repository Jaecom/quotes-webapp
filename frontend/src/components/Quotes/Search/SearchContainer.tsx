import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { setInitialQuotes } from "../../../store/quoteSlice";
import QuoteListContainer from "../QuoteListContainer";
import { QuoteListPlaceHolder } from "../QuotePlaceHolder";
import QuoteSearchNotFound from "./QuoteSearchNotFound";

interface CustomHistory {
	background: Location;
	noLoad: boolean;
}

const SearchContainer = () => {
	const { quotes } = useSelector((state: any) => state.quote);
	const history = useHistory<CustomHistory>();
	const q = new URLSearchParams(history.location.search).get("q") || "";
	const [done, setDone] = useState(false);

	const [sendRequest, isLoading, error] = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		if (q === "" || history.location.state?.noLoad) return setDone(true);

		const urlParams = new URLSearchParams(history.location.search);

		sendRequest(
			{
				url: `/api/search/quotes?${urlParams}`,
				method: "GET",
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
				if (history.action === "PUSH") window.scrollTo(0, 0);
				setDone(true);
			}
		);

		return () => {
			setDone(false);
		};
	}, [q, sendRequest, dispatch, history]);

	return (
		<>
			{isLoading && <QuoteListPlaceHolder count={Math.floor(Math.random() * 10 + 1)} />}
			{done && quotes && quotes.length !== 0 && <QuoteListContainer api={"/api/quotes"} />}
			{done && quotes && quotes.length === 0 && <QuoteSearchNotFound searchWord={q} />}
		</>
	);
};

export default SearchContainer;

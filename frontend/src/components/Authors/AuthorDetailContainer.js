import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import QuoteList from "../Quotes/QuoteList";
import useHttp from "../../hooks/useHttp";
import AuthorHeader from "./AuthorHeader";
import { setInitialQuotes } from "../../store/quoteSlice";

const AuthorDetailContainer = (props) => {
	console.log("AuthorDetailContainer");
	const [sendRequest, isLoading, error] = useHttp();
	const dispatch = useDispatch();
	const { authorId } = useParams();
	const { quotes } = useSelector((state) => state.quote);

	useEffect(() => {
		sendRequest(
			{
				url: `/api/authors/${authorId}`,
			},
			(data) => {
				dispatch(setInitialQuotes({ ...data }));
			}
		);
	}, [sendRequest, dispatch, authorId]);

	return (
		<>
			<AuthorHeader />
			<QuoteList quotes={quotes} />;
		</>
	);
};

export default AuthorDetailContainer;

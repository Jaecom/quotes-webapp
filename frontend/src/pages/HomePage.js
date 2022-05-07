import QuoteListContainer from "components/Quotes/QuoteListContainer";

const MainPage = () => {
	return (
		<>
			<QuoteListContainer api="/api/quotes" />
		</>
	);
};

export default MainPage;

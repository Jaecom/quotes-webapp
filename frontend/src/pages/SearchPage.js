import QuoteListContainer from "components/Quotes/QuoteListContainer";

const SearchPage = () => {
	return <QuoteListContainer api="/api/search/quotes" search />;
};

export default SearchPage;

import QuoteList from "../components/Quotes/QuoteList";
import quoteData from "../seeds/quoteData";
import MainBanner from "../components/Layout/MainBanner";

const Main = () => {
	return (
		<>
			<MainBanner />
			<QuoteList quotes={quoteData} />
		</>
	);
};

export default Main;

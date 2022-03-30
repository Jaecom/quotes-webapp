import QuoteDetailContainer from "../components/Quotes/Detail/QuoteDetailContainer";
import ScrollToTop from "../components/Utils/ScrollToTop";

const QuoteDetailPage = (props) => {
	return (
		<div style={{marginTop: "5rem"}}> 
			<ScrollToTop />
			<QuoteDetailContainer />
		</div>
	);
};

export default QuoteDetailPage;

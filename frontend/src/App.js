import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainNavigation from "./components/Layout/MainNavigation";
import MainFooter from "./components/Layout/MainFooter";
import { useLocation } from "react-router";
import QuoteDetailModal from "./components/Quotes/QuoteDetailModal";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import QuoteDetailContainer from "./components/Quotes/QuoteDetailContainer";

function App() {
	let location = useLocation();
	let background = location.state?.background;

	return (
		<div className="App">
			<MainNavigation />

			<Switch location={background || location}>
				<Route path="/" exact>
					<HomePage />
				</Route>

				<Route path="/quotes/:quoteId">
					<QuoteDetailPage />
				</Route>

				<Route path="/author/:authorId">
					<div>AuthorId</div>
				</Route>

				<Route path="/title/:titleId">
					<div>TitleId</div>
				</Route>

				<Route path="/user/:userId">
					<div>UserId</div>
				</Route>

				<Route path="*">
					<div>ERROR</div>
				</Route>
			</Switch>

			{background && (
				<Route path="/quotes/:quoteId">
					<QuoteDetailModal>
						<QuoteDetailContainer />
					</QuoteDetailModal>
				</Route>
			)}

			{/* <MainFooter /> */}
		</div>
	);
}

export default App;

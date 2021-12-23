import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainNavigation from "./components/Layout/MainNavigation";
import { useLocation } from "react-router";
import QuoteDetailModal from "./components/Quotes/QuoteDetail/QuoteDetailModal";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import QuoteDetailContainer from "./components/Quotes/QuoteDetail/QuoteDetailContainer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";

function App() {
	const location = useLocation();
	const background = location.state?.background;

	return (
		<div className="App">
			<Switch location={background || location}>
				<Route path="/" exact>
					<MainNavigation />
					<HomePage />
				</Route>

				<Route path="/quotes/:quoteId">
					<MainNavigation />
					<QuoteDetailPage />
				</Route>

				<Route path="/authors/:authorId">
					<MainNavigation />
					<AuthorDetailPage />
				</Route>

				<Route path="/title/:titleId">
					<MainNavigation />
					<div>TitleId</div>
				</Route>

				<Route path="/user/:userId">
					<MainNavigation />
					<div>UserId</div>
				</Route>

				<Route path="/signup">
					<SignupPage />
				</Route>

				<Route path="/login">
					<LoginPage />
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
		</div>
	);
}

export default App;

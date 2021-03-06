import "./App.css";

import { useContext } from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";

import AuthContext from "./store/auth-context";
import MainNavigation from "./components/Layout/MainNavigation";
import QuoteDetailModal from "./components/Quotes/Detail/QuoteDetailModal";
import QuoteDetailContainer from "./components/Quotes/Detail/QuoteDetailContainer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import CollectionsPage from "./pages/CollectionsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import CollectionDetailModal from "./components/Collections/Detail/CollectionDetailModal";
import CreateQuotePage from "./pages/CreateQuotePage";
import SearchPage from "./pages/SearchPage";
import Typography from "./assets/styles/Typography";

function App() {
	const location = useLocation();
	const background = location.state?.background;

	const authCtx = useContext(AuthContext);
	return (
		<div className="App">
			<Switch location={background || location}>
				{process.env.NODE_ENV === "development" && (
					<Route path="/dev">
						<Typography />
					</Route>
				)}

				<Route path="/" exact>
					<MainNavigation />
					<HomePage />
				</Route>

				<Route path="/search/quotes" exact>
					<MainNavigation />
					<SearchPage />
				</Route>

				{authCtx.isLoggedIn && (
					<Route path="/collections">
						<MainNavigation />
						<CollectionsPage />
					</Route>
				)}

				{authCtx.isLoggedIn && (
					<Route path="/create" exact>
						<MainNavigation />
						<CreateQuotePage />
					</Route>
				)}

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
					<PageNotFound />
				</Route>
			</Switch>

			{background && authCtx.isLoggedIn && (
				<Route path="/collections/:collectionId">
					<CollectionDetailModal />
				</Route>
			)}

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

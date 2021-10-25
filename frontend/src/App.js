import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import MainNavigation from "./components/Layout/MainNavigation";
import MainFooter from "./components/Layout/MainFooter";
import QuoteDetail from "./components/Quotes/QuoteDetail";
import { useLocation } from "react-router";
import QuoteDetailModal from "./components/Quotes/QuoteDetailModal";

function App() {
	let location = useLocation();
	let background = location.state && location.state.background;

	return (
		<div className="App">
			<MainNavigation />

			<Switch location={background || location}>
				<Route path="/" exact>
					<Main />
				</Route>

				<Route path="/quotes/:quoteId">
					<QuoteDetail />
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
						<QuoteDetail />
					</QuoteDetailModal>
				</Route>	
			)}

			<MainFooter />
		</div>
	);
}

export default App;

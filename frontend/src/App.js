import "./App.css";
import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import MainNavigation from "./components/Layout/MainNavigation";
import MainFooter from "./components/Layout/MainFooter";

function App() {
	return (
		<div className="App">
			<MainNavigation />

			<Switch>
				<Route path="/" exact>
					<Main />
				</Route>

				<Route path="/:quoteId" exact>
					<div>QuoteId</div>
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
			</Switch>

			<MainFooter />
		</div>
	);
}

export default App;

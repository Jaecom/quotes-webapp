import classes from "./MainNavigation.module.scss";
import { NavLink, Link } from "react-router-dom";
import "../../assets/styles/main.scss";
import SearchBar from "./SearchBar";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<Link to="/">
					<div className={`${classes.logo} heading-nav`}>Quotes</div>
				</Link>
				<SearchBar />
				<ul>
					<li>
						<NavLink to="/" className="heading-nav">
							One
						</NavLink>
					</li>
					<li>
						<NavLink to="/" className="heading-nav">
							Two
						</NavLink>
					</li>
					<li>
						<NavLink to="/" className="heading-nav">
							Three
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

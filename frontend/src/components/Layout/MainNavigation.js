import classes from "./MainNavigation.module.scss";
import { NavLink, Link } from "react-router-dom";
import "../../assets/styles/main.scss";
import SearchBar from "./SearchBar";
import Button from "../UI/Button";

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
						<NavLink to="/login" className="heading-nav">
							Login
						</NavLink>
					</li>
					<li>
						<NavLink to="/signup" className="heading-nav">
							<Button>Signup</Button>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

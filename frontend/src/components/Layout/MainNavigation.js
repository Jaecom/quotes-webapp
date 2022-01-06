import classes from "./MainNavigation.module.scss";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "../UI/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserMenu from "./UserMenu";

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<Link to="/">
					<div className={`${classes.logo} heading-nav`}>Quotes</div>
				</Link>
				<SearchBar />
				<ul>
					{!authCtx.isLoggedIn && (
						<li>
							<NavLink to="/login" className="heading-nav">
								Login
							</NavLink>
						</li>
					)}

					{!authCtx.isLoggedIn && (
						<li>
							<NavLink to="/signup" className="heading-nav">
								<Button highlight>Signup</Button>
							</NavLink>
						</li>
					)}

					{authCtx.isLoggedIn && (
						<li className="heading-nav">
							<UserMenu />
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

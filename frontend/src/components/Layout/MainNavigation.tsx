import classes from "./MainNavigation.module.scss";

import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import SearchBar from "./SearchBar";
import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";
import UserMenu from "./UserMenu";
import useModal from "../../hooks/useModal";
import Sidebar from "./Sidebar";
import Hamburger from "./Hamburger";

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);
	const location = useLocation();

	const [isSideOpen, openSide, closeSide] = useModal();
	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<Sidebar className={classes["show-responsive"]} onClose={closeSide} isOpen={isSideOpen} />

				<div className={classes.core}>
					<Hamburger
						className={classes["show-responsive"]}
						onOpen={openSide}
						onClose={closeSide}
						isOpen={isSideOpen}
					/>

					<Link to="/">
						<div className={classes.logo}>
							<div className={`heading-nav`}>Quotes</div>
						</div>
					</Link>

					<ul className={`${classes.sub} ${classes["hide-responsive"]}`}>
						<li>
							<Link to="/explore" className="heading-nav--bold">
								Explore
							</Link>
						</li>

						<li>
							<Link to="/genres" className="heading-nav--bold">
								Genres
							</Link>
						</li>

						<li>
							<Link to="/authors" className="heading-nav--bold">
								Authors
							</Link>
						</li>
					</ul>
				</div>

				<ul className={classes["user-controls"]}>
					<li className={classes.search}>
						<SearchBar />
					</li>

					{!authCtx.isLoggedIn && (
						<li className={classes["hide-responsive"]}>
							<NavLink
								to={{ pathname: `/login`, state: { beforeAuth: location } }}
								className="heading-nav"
							>
								<Button outline>Login</Button>
							</NavLink>
						</li>
					)}

					{!authCtx.isLoggedIn && (
						<li className={classes["hide-responsive"]}>
							<NavLink
								to={{ pathname: `/signup`, state: { beforeAuth: location } }}
								className="heading-nav"
							>
								<Button fill>Signup</Button>
							</NavLink>
						</li>
					)}

					{authCtx.isLoggedIn && (
						<li className={`${classes["hide-responsive"]}`}>
							<NavLink to="/create" className="heading-nav">
								<Button fill>Create</Button>
							</NavLink>
						</li>
					)}

					{authCtx.isLoggedIn && (
						<li className={classes["hide-responsive"]}>
							<UserMenu />
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

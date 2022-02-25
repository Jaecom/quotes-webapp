import classes from "./MainNavigation.module.scss";

import { NavLink, Link } from "react-router-dom";
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

	const [isSideOpen, openSide, closeSide] = useModal();
	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<Sidebar className={classes["show-responsive"]} onClose={closeSide} isOpen={isSideOpen} />

				<Link to="/" className={classes["hide-responsive"]}>
					<div className={`${classes.logo} heading-nav`}>Quotes</div>
				</Link>

				<Hamburger
					className={classes["show-responsive"]}
					onOpen={openSide}
					onClose={closeSide}
					isOpen={isSideOpen}
				/>

				<SearchBar />
				<ul className={classes["user-controls"]}>
					{!authCtx.isLoggedIn && (
						<li>
							<NavLink to="/login" className="heading-nav">
								<Button>Login</Button>
							</NavLink>
						</li>
					)}

					{!authCtx.isLoggedIn && (
						<li className={classes["hide-responsive"]}>
							<NavLink to="/signup" className="heading-nav">
								<Button fill>Signup</Button>
							</NavLink>
						</li>
					)}

					{authCtx.isLoggedIn && (
						<li className={`heading-nav ${classes["hide-responsive"]}`}>
							<NavLink to="/create" className="heading-nav">
								<Button fill>Create</Button>
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

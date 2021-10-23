import classes from "./MainNavigation.module.scss";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Main Navigation</div>
			<nav className={classes.nav}>
				<ul>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

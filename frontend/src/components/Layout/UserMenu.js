import classes from "./UserMenu.module.scss";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const UserMenu = () => {
	const authCtx = useContext(AuthContext);

	return (
		<div className={classes.wrapper}>
			<img
				className={classes["user-image"]}
				alt="User"
				src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60"
			/>
			<div className={classes["action-wrapper"]}>
				<ul className={classes["action-list"]}>
					<li className={classes["action-item"]}>
						<Link className={classes["action-link"]} to="/profile">
							Profile
						</Link>
					</li>
					<li className={classes["action-item"]}>
						<Link className={classes["action-link"]} to="/collections">
							My Collections
						</Link>
					</li>
					<li className={classes["action-item"]}>
						<Link className={classes["action-link"]} to="/likes">
							My Likes
						</Link>
					</li>
					<li className={classes["action-item"]}>
						<Link className={classes["action-link"]} to="/settings">
							Account Settings
						</Link>
					</li>
					<li className={classes["action-item"]}>
						<Button onClick={authCtx.logout}>Signout</Button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserMenu;

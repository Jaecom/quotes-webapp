import classes from "./UserMenu.module.scss";
import { Link } from "react-router-dom";
import LogoutButtonContainer from "../Auth/LogoutButtonContainer";
import { useSelector } from "react-redux";

const UserMenu = () => {
	const user = useSelector((state: any) => state.user);

	return (
		<div className={classes.wrapper}>
			<div className={classes["user-image"]}>
				<img
					alt="User"
					src={user.profilePicture}
					onError={(error) => (error.currentTarget.style.display = "none")}
					onLoad={(event) => (event.currentTarget.style.display = "block")}
				/>
			</div>
			<div className={classes["action-wrapper"]}>
				<ul className={classes["action-list"]}>
					<li>
						<Link className="heading-nav" to="/profile">
							Profile
						</Link>
					</li>
					<li>
						<Link className="heading-nav" to="/collections">
							My Collections
						</Link>
					</li>
					<li>
						<Link className="heading-nav" to="/settings">
							Account Settings
						</Link>
					</li>
					<li>
						<LogoutButtonContainer />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserMenu;

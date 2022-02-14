import AuthContext from "./auth-context";
import { useEffect, useState } from "react";

let logoutTimer;

const getCookies = () => {
	let object = {};
	document.cookie.split("; ").forEach((element) => {
		const splitArray = element.split("=");
		object[splitArray[0]] = splitArray[1];
	});
	return object;
};

const doesTokenExist = () => {
	document.cookie = "token=-1";
	const cookies = getCookies();
	if (cookies.token === "-1") {
		return false;
	}
	return true;
};

const initialCookies = getCookies();
const isTokenPresent = doesTokenExist();

const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(initialCookies?.isLoggedIn ?? false);
	const [userId, setUserId] = useState(initialCookies?.userId);
	const [expiration, setExpiration] = useState(initialCookies?.expirationDate);

	const loginHandler = (token, expiration, userId) => {
		setIsLoggedIn(true);
		setUserId(userId);
		setExpiration(expiration);
	};

	const logoutHandler = async () => {
		setIsLoggedIn(false);
		setUserId("");
		setExpiration("");
	};

	// autoLogout;
	useEffect(() => {
		if (isLoggedIn && expiration) {
			const currentTimeMili = new Date().getTime();
			const expirationTimeMili = expiration * 1000;
			const remaingTimeMili = expirationTimeMili - currentTimeMili;
			logoutTimer = setTimeout(() => {
				logoutHandler();
			}, remaingTimeMili);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [isLoggedIn, expiration]);

	//if any of required cookies are missing & token present, logout
	useEffect(() => {
		const requestLogout = async () => {
			await fetch("/api/users/logout", {
				method: "POST",
				credentials: "include",
			});
		};

		if (
			(!initialCookies.isLoggedIn || !initialCookies.expirationDate || !initialCookies.userId) &&
			isTokenPresent
		) {
			requestLogout();
			logoutHandler();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ login: loginHandler, logout: logoutHandler, isLoggedIn, userId }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

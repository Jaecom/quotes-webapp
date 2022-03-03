import AuthContext from "./auth-context";
import { useEffect, useState, useCallback } from "react";
import useHttp from "../hooks/useHttp";
import { useDispatch } from "react-redux";
import { loadUserData, clearUserData } from "./userSlice";

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
	document.cookie = "token=-1; path=/;";
	const cookies = getCookies();
	if (cookies.token === "-1") {
		return false;
	}
	return true;
};

const isTokenPresent = doesTokenExist();

const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(isTokenPresent ?? false);
	const [userId, setUserId] = useState(null);
	const [expiration, setExpiration] = useState(null);
	const [sendRequest] = useHttp();
	const dispatch = useDispatch();

	const loginHandler = useCallback(
		(expiration, userId, basicUserData) => {
			setIsLoggedIn(true);
			setUserId(userId);
			setExpiration(expiration);
			dispatch(loadUserData(basicUserData));
		},
		[dispatch]
	);

	const logoutHandler = useCallback(async () => {
		setIsLoggedIn(false);
		setUserId("");
		setExpiration("");
		dispatch(clearUserData());
	}, [dispatch]);

	const requestLogout = useCallback(async () => {
		sendRequest(
			{
				url: "/api/users/logout",
				method: "POST",
			},
			() => {
				logoutHandler();
			}
		);
	}, [sendRequest, logoutHandler]);

	//load user data if already signed in
	useEffect(() => {
		if (!isTokenPresent) return;

		sendRequest(
			{
				url: "/api/users/getBasicData",
				credentials: "include",
			},
			(data) => {
				loginHandler(data.expirationDate, data.userId, data.basicUserData);
			},
			(error) => {
				//invalid token
				requestLogout();
			}
		);
	}, [sendRequest, dispatch, requestLogout, logoutHandler, loginHandler]);

	// autoLogout;
	useEffect(() => {
		if (isLoggedIn && expiration) {
			const currentTimeMili = new Date().getTime();
			const expirationTimeMili = expiration * 1000;
			const remaingTimeMili = expirationTimeMili - currentTimeMili;
			logoutTimer = setTimeout(() => {
				requestLogout();
			}, remaingTimeMili);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [isLoggedIn, expiration, logoutHandler, requestLogout]);

	return (
		<AuthContext.Provider
			value={{ login: loginHandler, logout: requestLogout, isLoggedIn, userId }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

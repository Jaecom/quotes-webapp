import AuthContext from "./auth-context";
import { useEffect, useState } from "react";
const LOCAL_TOKEN_KEY = "token";
const LOCAL_TOKEN_EXPIRATION_KEY = "expiration";
const LOCAL_USER_ID_KEY = "userId";
let logoutTimer;

//initially retrieve token
const retrieveToken = () => {
	const token = localStorage.getItem(LOCAL_TOKEN_KEY);
	const expiration = localStorage.getItem(LOCAL_TOKEN_EXPIRATION_KEY);
	const userId = localStorage.getItem(LOCAL_USER_ID_KEY);
	return { token, expiration, userId };
};

const AuthProvider = (props) => {
	const tokenData = retrieveToken();

	const [token, setToken] = useState(tokenData.token);
	const [expiration, setExpiration] = useState(tokenData.expiration);
	const [userId, setUserId] = useState(tokenData.userId);

	const loginHandler = (token, expiration, userId) => {
		setToken(token);
		setExpiration(expiration);
		setUserId(userId);
		localStorage.setItem(LOCAL_TOKEN_KEY, token);
		localStorage.setItem(LOCAL_TOKEN_EXPIRATION_KEY, expiration);
		localStorage.setItem(LOCAL_USER_ID_KEY, userId);
	};

	const logoutHandler = () => {
		setToken(null);
		setExpiration(null);
		setUserId(null);
		localStorage.removeItem(LOCAL_TOKEN_KEY);
		localStorage.removeItem(LOCAL_TOKEN_EXPIRATION_KEY);
		localStorage.removeItem(LOCAL_USER_ID_KEY);
	};

	//autoLogout
	useEffect(() => {
		if (token && expiration) {
			const currentTimeMili = new Date().getTime();
			const expirationTimeMili = expiration * 1000;
			const remaingTimeMili = expirationTimeMili - currentTimeMili;

			logoutTimer = setTimeout(logoutHandler, remaingTimeMili);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, expiration]);

	return (
		<AuthContext.Provider
			value={{ login: loginHandler, logout: logoutHandler, isLoggedIn: !!token, token, userId }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

import AuthContext from "./auth-context";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const LOCAL_TOKEN_KEY = "token";
const LOCAL_TOKEN_EXPIRATION_KEY = "expiration";
let logoutTimer;

//initially retrieve token
const retrieveToken = () => {
	const token = localStorage.getItem(LOCAL_TOKEN_KEY);
	const expiration = localStorage.getItem(LOCAL_TOKEN_EXPIRATION_KEY);
	return { token, expiration };
};

const AuthProvider = (props) => {
	const tokenData = retrieveToken();

	const [token, setToken] = useState(tokenData.token);
	const [expiration, setExpiration] = useState(tokenData.expiration);
	const history = useHistory();

	const loginHandler = (token, expiration) => {
		setToken(token);
		setExpiration(expiration);
		localStorage.setItem(LOCAL_TOKEN_KEY, token);
		localStorage.setItem(LOCAL_TOKEN_EXPIRATION_KEY, expiration);
		history.goBack();
	};

	const logoutHandler = () => {
		setToken(null);
		setExpiration(null);
		localStorage.removeItem(LOCAL_TOKEN_KEY);
		localStorage.removeItem(LOCAL_TOKEN_EXPIRATION_KEY);
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
			value={{ login: loginHandler, logout: logoutHandler, isLoggedIn: !!token, token }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

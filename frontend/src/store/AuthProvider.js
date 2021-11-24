import AuthContext from "./auth-context";
import { useEffect, useState } from "react";

const LOCAL_TOKEN_KEY = "token";
const LOCAL_TOKEN_EXPIRATION_KEY = "expiration";

//initially retrieve token
const retrieveToken = () => {
		
}

const AuthProvider = (props) => {
	const [token, setToken] = useState();
	const [expiration, setExpiration] = useState();

	//autoLogin
	useEffect(() => {}, []);

	//autoLogout
	useEffect(() => {}, []);

	const loginHandler = (token, expirationDate) => {};

	const signInHandler = (token, expirationData) => {};

	return (
		<AuthContext.Provider value={{ login: loginHandler, signIn: signInHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

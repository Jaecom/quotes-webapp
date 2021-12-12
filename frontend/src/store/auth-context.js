import React from "react";

const AuthContext = React.createContext({
	login: (token, expiration) => {},
	logout: () => {},
	isLoggedIn: false,
	token: null,
	userId: null
});

export default AuthContext;

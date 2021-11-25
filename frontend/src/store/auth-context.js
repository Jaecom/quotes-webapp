import React from "react";

const AuthContext = React.createContext({
	login: (token, expiration) => {},
	logout: () => {},
	isLoggedIn: false,
});

export default AuthContext;

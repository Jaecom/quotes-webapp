import React from "react";

const AuthContext = React.createContext({
	login: (expiration, userId, basicUserData) => {},
	logout: () => {},
	isLoggedIn: false,
	token: "",
	userId: ""
});

export default AuthContext;

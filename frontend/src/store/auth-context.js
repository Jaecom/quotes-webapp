import React from "react";

const AuthContext = React.createContext({
	login: (token, expirationDate) => {},
	signIn: (token, expirationDate) => {},
});

export default AuthContext;

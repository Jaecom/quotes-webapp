import React from "react";

const AuthContext = React.createContext({
	login: (email, password) => {},
	signIn: (name, email, password) => {},
});

export default AuthContext;

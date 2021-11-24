import AuthContext from "./auth-context";

const AuthProvider = (props) => {
	const loginHandler = () => {};

	const signInHandler = () => {};

	return (
		<AuthContext.Provider value={{ login: loginHandler, signIn: signInHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

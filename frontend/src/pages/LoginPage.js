import AuthBackground from "../components/Auth/AuthBackground";
import AuthContainer from "../components/Auth/AuthContainer";

const LoginPage = () => {
	return (
		<>
			<AuthBackground>
				<AuthContainer login />
			</AuthBackground>
		</>
	);
};

export default LoginPage;

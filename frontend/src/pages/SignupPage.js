import AuthBackground from "../components/Auth/AuthBackground";
import AuthContainer from "../components/Auth/AuthContainer";

const SignupPage = () => {
	return (
		<>
			<AuthBackground>
				<AuthContainer signup />
			</AuthBackground>
		</>
	);
};

export default SignupPage;

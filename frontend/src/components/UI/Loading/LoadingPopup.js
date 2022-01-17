import Loading from "./Loading";
import classes from "./LoadingPopup.module.scss";

const LoadingPopup = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<Loading />
			</div>
		</div>
	);
};

export default LoadingPopup;

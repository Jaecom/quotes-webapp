import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.loader}></div>;
		</div>
	);
};

export default LoadingSpinner;

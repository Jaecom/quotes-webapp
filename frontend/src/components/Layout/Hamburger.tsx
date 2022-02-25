import classes from "./Hamburger.module.scss";

const Hamburger = (props: {
	onOpen?: () => void;
	onClose?: () => void;
	isOpen: boolean;
	className: string;
}) => {
	const { onOpen, onClose, isOpen, className } = props;

	return (
		<div className={`${classes.container} ${className}`} onClick={isOpen ? onClose : onOpen}>
			<div className={`${classes.hamburger} ${isOpen && classes["hamburger--transform"]}`}>
				<span className={classes.line} />
				<span className={classes.line} />
				<span className={classes.line} />
			</div>
		</div>
	);
};

export default Hamburger;

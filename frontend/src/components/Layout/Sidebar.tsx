import classes from "./Sidebar.module.scss";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	className: string;
}

const Sidebar = (props: Props) => {
	const { className, isOpen, onClose } = props;
	return (
		<>
			<div
				className={`${className} ${classes.sidebar} ${
					isOpen ? classes["sidebar--show"] : classes["sidebar--hide"]
				}`}
			></div>
			<div
				onClick={onClose}
				className={`${classes.backdrop} ${
					isOpen ? classes["backdrop--show"] : classes["backdrop--hide"]
				}`}
			/>
		</>
	);
};

export default Sidebar;

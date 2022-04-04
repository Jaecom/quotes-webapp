import classes from "./QuoteDetailSideBar.module.scss";
import sprite from "../../../assets/sprite.svg";

interface Props {
	onQuoteLike: () => void;
	onQuoteSave: () => void;
	isLiked: boolean;
	mobile?: boolean;
}

const QuoteDetailToolbar = ({ onQuoteLike, onQuoteSave, isLiked, mobile }: Props) => {
	return (
		<>
			<div
				className={`${classes.control} ${mobile ? classes.mobile : ""}  ${
					isLiked ? classes.liked : ""
				} `}
				onClick={onQuoteLike}
			>
				<div className={classes.button}>
					<svg>
						<use href={sprite + "#icon-bookmark"} />
					</svg>
				</div>
				<label>{isLiked ? "Liked" : "Like"}</label>
			</div>

			<div className={`${classes.control} ${mobile ? classes.mobile : ""}`} onClick={onQuoteSave}>
				<div className={classes.button}>
					<svg>
						<use href={sprite + "#icon-plus"} />
					</svg>
				</div>
				<label>Save</label>
			</div>
		</>
	);
};

export default QuoteDetailToolbar;

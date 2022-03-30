import classes from "./QuoteDetailSideBar.module.scss";
import sprite from "../../../assets/sprite.svg";  

interface Props {
	quoteId: String;
	onQuoteLike: () => void;
	onQuoteSave: () => void;
	isLiked: boolean;
}

const QuoteDetailToolbar = ({ quoteId, onQuoteLike, onQuoteSave, isLiked }: Props) => {
	return (
		<div>
			<div className={`${classes.control} ${isLiked ? classes.liked : ""}`} onClick={onQuoteLike}>
				<div className={classes.button}>
					<svg className={classes.icon}>
						<use href={sprite + "#icon-bookmark"} />
					</svg>
				</div>
				<p>{isLiked ? "Liked" : "Like"}</p>
			</div>

			<div className={classes.control} onClick={onQuoteSave}>
				<div className={classes.button}>
					<svg className={classes.icon}>
						<use href={sprite + "#icon-plus"} />
					</svg>
				</div>
				<p>Save</p>
			</div>
		</div>
	);
};

export default QuoteDetailToolbar;

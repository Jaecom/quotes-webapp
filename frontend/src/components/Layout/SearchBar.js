import classes from "./SearchBar.module.scss";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import sprite from "../../assets/sprite.svg";

const SearchBar = () => {
	const searchRef = useRef();
	const history = useHistory();
	const { search } = useLocation();
	const searchWord = new URLSearchParams(search).get("search");

	useEffect(() => {
		if (history.location.state?.background) {
			return;
		}

		searchRef.current.value = searchWord;
	}, [searchWord, history]);

	const submitHandler = (event) => {
		event.preventDefault();
		const searchTerm = searchRef.current.value;

		history.push(`/?search=${searchTerm}`);
		searchRef.current.blur();
	};

	return (
		<>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.container}>
					<svg className={classes.icon}>
						<use href={sprite + "#icon-magnifying-glass"} />
					</svg>
					<input type="search" className={classes.searchbar} placeholder="Search" ref={searchRef} />
				</div>
			</form>
		</>
	);
};

export default SearchBar;

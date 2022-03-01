import classes from "./SearchBar.module.scss";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import sprite from "../../assets/sprite.svg";

const SearchBar = () => {
	const searchRef = useRef();
	const history = useHistory();

	useEffect(() => {
		//fill searchbar with searchword
		searchRef.current.value = new URLSearchParams(history.location.search).get("q") || "";
	}, [history.location]);

	const submitHandler = (event) => {
		event.preventDefault();
		const searchTerm = searchRef.current.value;

		if (!searchTerm) return;

		history.push(`/search/quotes?q=${searchTerm}`);
		searchRef.current.blur();
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes["search-container"]}>
				<svg className={classes.icon}>
					<use href={sprite + "#icon-magnifying-glass"} />
				</svg>
				<input type="search" className={classes.searchbar} placeholder="Search" ref={searchRef} />
			</div>
		</form>
	);
};

export default SearchBar;

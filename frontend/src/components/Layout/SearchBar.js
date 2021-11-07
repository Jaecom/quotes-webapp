import classes from "./SearchBar.module.scss";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

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
		window.scrollTo(0, 0);
	};

	return (
		<form className={classes["search-form"]} onSubmit={submitHandler}>
			<input type="search" className={classes.searchbar} placeholder="Search" ref={searchRef} />
		</form>
	);
};

export default SearchBar;

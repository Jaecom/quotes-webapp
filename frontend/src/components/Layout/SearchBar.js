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
		searchRef.current.value = searchWord;
	}, [searchWord]);

	const submitHandler = (event) => {
		event.preventDefault();
		const searchTerm = searchRef.current.value;
		return history.push(`/?search=${searchTerm}`);
	};

	return (
		<form className={classes["search-form"]} onSubmit={submitHandler}>
			<input type="search" className={classes.searchbar} placeholder="Search" ref={searchRef} />
		</form>
	);
};

export default SearchBar;
import { useLocation, matchPath } from "react-router";

const pathsToMatch = ["/", "/authors/:id", "/collections", "/collections/:id"];

const useLinkStateBackground = () => {
	const location = useLocation();

	const matched = matchPath(location.pathname, {
		path: pathsToMatch,
		exact: true,
		strict: true,
	});

	//if match, set background
	//if not, pass location.state
	return matched ? { background: location } : location.state;
};

export default useLinkStateBackground;

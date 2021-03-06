import { RequestHandler } from "express";
import fetch from "node-fetch";

interface BookData {
	items: [
		{
			volumeInfo: {
				title?: string;
				authors?: string[];
				publishedDate?: string;
				imageLinks?: string;
				categories?: string;
			};
		}
	];
}

const searchTitle: RequestHandler = async (req, res, next) => {
	const { query } = req.params;

	const baseUrl = new URL("https://www.googleapis.com/books/v1/volumes");
	baseUrl.searchParams.append("q", `intitle:${query}`);
	baseUrl.searchParams.append("maxResults", "4");
	baseUrl.searchParams.append("bookType", "books");
	baseUrl.searchParams.append(
		"fields",
		"items(volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks, volumeInfo/categories, volumeInfo/publishedDate)"
	);
	const response = await fetch(baseUrl.toString());
	const data = (await response.json()) as BookData;

	if (!data.items) {
		return res.json([]);
	}

	const removeDuplicates = data.items.filter((v, i, a) => {
		return a.findIndex((t) => t.volumeInfo.title === v.volumeInfo.title) === i;
	});

	const cleanup = removeDuplicates.map((element) => {
		const authorArray = element.volumeInfo.authors;

		const author = authorArray ? authorArray[0] : "";
		const newObject = { ...element.volumeInfo, author, genres: element.volumeInfo.categories };
		delete newObject.authors;
		delete newObject.categories;

		return newObject;
	});

	res.json(cleanup);
};

export default { searchTitle };

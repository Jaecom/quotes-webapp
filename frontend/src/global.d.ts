interface collection {
	_id: string;
	name: string;
	description: string;
	quotes: objectID[]; //objectIds
	isPrivate: boolean;
}

interface user {
	id: string;
	email: string;
	username: string;
	hash: string;
	likedQuotes: string[]; //objectId Array
	collections: string[]; //objectId Array
}

interface author {
	id: string;
	quotes: string[]; //objectId Array
	works: {};
	info: {
		name: string;
	};
}

interface quote {
	id: string;
	quoteFull: string;
	quoteShort: string;
	author: {
		name: string;
		authorObject: string; //objectId
	};
	source: string;
	genre: string[]; //objectId Array
	image: string;
	likes: {
		users: string[]; //objectId Array
		total: number;
	};
	keywords: string;
	excludeKeywords: string;
	previewQuote: string;
	thumbnail: string;
}

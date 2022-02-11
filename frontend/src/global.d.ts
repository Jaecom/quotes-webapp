type ObjectId = string;

interface collection {
	_id: ObjectId;
	name: string;
	description: string;
	quotes: ObjectId[]; //objectIds
	isPrivate: boolean;
}

interface user {
	id: ObjectId;
	email: string;
	username: string;
	hash: string;
	likedQuotes: ObjectId[]; //objectId Array
	collections: ObjectId[]; //objectId Array
}

interface author {
	id: ObjectId;
	quotes: ObjectId[]; //objectId Array
	works: {};
	info: {
		name: string;
	};
}

interface quote {
	id: ObjectId;
	quoteRaw: string;
	quoteFull: string;
	quoteShort: string;
	author: {
		name: string;
		authorObject: string; //objectId
	};
	source: string;
	genre: ObjectId[]; //objectId Array
	image: {
		original: string;
		medium: string;
		thumbnail: string;
	};
	likes: {
		users: ObjectId[]; //objectId Array
		total: number;
	};
	keywords: string;
	excludeKeywords: string;
	previewQuote: string;
}

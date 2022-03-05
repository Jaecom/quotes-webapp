type ObjectId = string;

interface Collection {
	_id: ObjectId;
	name: string;
	description: string;
	quotes: ObjectId[]; //objectIds
	isPrivate: boolean;
}

interface User {
	id: ObjectId;
	email: string;
	username: string;
	hash: string;
	likedQuotes: ObjectId[]; //objectId Array
	collections: ObjectId[]; //objectId Array
}

interface Author {
	id: ObjectId;
	quotes: ObjectId[]; //objectId Array
	works: {};
	info: {
		name: string;
	};
}

interface Quote {
	_id: ObjectId;
	text: {
		raw: string;
		full: string;
		short: string;
		keywords: string;
		noKeywords: string;
		preview: string;
	};
	author: {
		name: string;
		authorObject: ObjectId; //objectId
	};
	title: string;
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
	isBanner?: boolean;
	createdDate: string;
}

export type ObjectId = string;

export interface Collection {
	_id: ObjectId;
	name: string;
	description: string;
	quotes: ObjectId[]; 
	isPrivate: boolean;
}

export interface User {
	id: ObjectId;
	email: string;
	username: string;
	hash: string;
	likedQuotes: ObjectId[];
	collections: Collection[];
	ownedQuotes: ObjectId[];
	profilePicture: string;
}

export interface Author {
	id: ObjectId;
	quotes: ObjectId[];
	works: {};
	info: {
		name: string;
	};
}

export interface Quote {
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
		authorObject: string;
	};
	title: string;
	genre: ObjectId[];
	image: {
		original: string;
		medium: string;
		thumbnail: string;
	};
	likes: {
		users: ObjectId[];
		total: number;
	};
	isBanner?: boolean;
	createdDate: string;
	owner: ObjectId[];
	views: number;
}

export interface OwnerPopulatedQuote extends Omit<Quote, "owner"> {
	owner: User;
}

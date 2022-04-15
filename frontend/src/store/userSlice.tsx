import { createSlice } from "@reduxjs/toolkit";
import type { Collection, ObjectId } from "data-type";

interface UserData {
	likedQuotes: ObjectId[];
	ownedQuotes: ObjectId[];
	collections: Collection[];
	profilePicture: string;
	username: string;
}

const initialState: UserData = {
	likedQuotes: [],
	ownedQuotes: [],
	collections: [],
	profilePicture: "",
	username: ""
};

export const userSlice = createSlice({
	name: "quote",
	initialState,
	reducers: {
		loadUserData: (state, action: { payload: UserData }) => {
			const userData = action.payload;
			return userData;
		},
		clearUserData: (state, action) => {
			return initialState;
		},
		createCollection: (state, action: { payload: Collection }) => {
			const newCollection = action.payload;
			state.collections.push(newCollection);
		},
		addQuoteToCollection: (
			state,
			action: { payload: { quoteId: string; collectionId: string } }
		) => {
			const { quoteId, collectionId } = action.payload;
			state.collections.find((collection) => collection._id === collectionId)?.quotes.push(quoteId);
		},
		removeQuoteFromCollection: (
			state,
			action: { payload: { quoteId: string; collectionId: string } }
		) => {
			const { quoteId, collectionId } = action.payload;
			const foundCollection = state.collections.find(
				(collection) => collection._id === collectionId
			);

			if (foundCollection) {
				foundCollection.quotes = foundCollection?.quotes.filter((id) => id !== quoteId);
			}
		},
		likeQuote: (state, action: { payload: { quoteId: string } }) => {
			const { quoteId } = action.payload;
			state.likedQuotes.push(quoteId);
		},
		dislikeQuote: (state, action: { payload: { quoteId: string } }) => {
			const { quoteId } = action.payload;
			state.likedQuotes = state.likedQuotes.filter((id) => id !== quoteId);
		},
	},
});

export const {
	loadUserData,
	createCollection,
	addQuoteToCollection,
	removeQuoteFromCollection,
	clearUserData,
	likeQuote,
	dislikeQuote,
} = userSlice.actions;
export default userSlice.reducer;

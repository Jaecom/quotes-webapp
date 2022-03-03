import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	likedQuotes: Quote[];
	ownedQuotes: Quote[];
	collections: Collection[];
}

const initialState: InitialState = {
	likedQuotes: [],
	ownedQuotes: [],
	collections: [],
};

export const userSlice = createSlice({
	name: "quote",
	initialState,
	reducers: {
		loadUserData: (state, action) => {
			const userData = action.payload;
			return userData;
		},
		clearUserData: (state, action) => {
			return initialState;
		},
		addCollection: (state, action) => {
			const newCollection = action.payload;
			state.collections.push(newCollection);
		},
		addQuoteToCollection: (state, action) => {
			const { quoteId, collectionId } = action.payload;
			state.collections.find((collection) => collection._id === collectionId)?.quotes.push(quoteId);
		},
		removeQuoteFromCollection: (state, action) => {
			const { quoteId, collectionId } = action.payload;
			const foundCollection = state.collections.find(
				(collection) => collection._id === collectionId
			);

			if (foundCollection) {
				foundCollection.quotes = foundCollection?.quotes.filter((quote) => quote !== quoteId);
			}
		},
		likeQuote: (state, action) => {
			const { quoteId } = action.payload;
			state.likedQuotes.push(quoteId);
		},
		dislikeQuote: (state, action) => {
			const { quoteId } = action.payload;
			state.likedQuotes = state.likedQuotes.filter((quote) => quote !== quoteId);
		},
	},
});

export const {
	loadUserData,
	addCollection,
	addQuoteToCollection,
	removeQuoteFromCollection,
	clearUserData,
	likeQuote,
	dislikeQuote,
} = userSlice.actions;
export default userSlice.reducer;

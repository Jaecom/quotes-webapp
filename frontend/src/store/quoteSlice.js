import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	quotes: [],
	isLastPage: false,
	page: 1,
};

export const quoteSlice = createSlice({
	name: "quote",
	initialState,
	reducers: {
		setInitialQuotes: (state, action) => {
			const { quotes, isLastPage } = action.payload;
			state.quotes = quotes;
			state.isLastPage = isLastPage;
		},
		addNextQuotes: (state, action) => {
			const { quotes: newQuotes, isLastPage } = action.payload;
			state.quotes = state.quotes.concat(newQuotes);
			state.page += 1;
			state.isLastPage = isLastPage;
		},
		likeQuote: (state, action) => {
			const { quoteId, userId } = action.payload;
			const foundQuote = state.quotes.find((element) => element.id === quoteId);
			foundQuote.likes.total += 1;
			foundQuote.likes.users.push(userId);
		},
		dislikeQuote: (state, action) => {
			const { quoteId, userId } = action.payload;
			const foundQuote = state.quotes.find((element) => element.id === quoteId);
			const indexOfUser = foundQuote.likes.users.indexOf((element) => element === userId);
			foundQuote.likes.total -= 1;
			foundQuote.likes.users.splice(indexOfUser, 1);
		},
	},
});

export const { setInitialQuotes, addNextQuotes, likeQuote, dislikeQuote } = quoteSlice.actions;
export default quoteSlice.reducer;

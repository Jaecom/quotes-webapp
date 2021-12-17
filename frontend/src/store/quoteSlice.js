import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
		},
	},
});

export const {
	setInitialQuotes,
	addNextQuotes,
} = quoteSlice.actions;
export default quoteSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taxSlice = createSlice({
	name: 'tax',
	initialState,
	reducers: {
		addTax: (state, action) => {
			const { userId, taxData } = action.payload;
			state.push({ id: Date.now(), userId, ...taxData });
		},
		updateTax: (state, action) => {
			const { id, updatedData } = action.payload;
			const index = state.findIndex((record) => record.id === id);
			if (index !== -1) {
				state[index] = { ...state[index], ...updatedData };
			}
		},
		deleteTax: (state, action) => {
			return state.filter((record) => record.id !== action.payload);
		},
	},
});

export const { addTax, updateTax, deleteTax } = taxSlice.actions;
export default taxSlice.reducer;

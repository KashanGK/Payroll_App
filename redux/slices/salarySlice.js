import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const salarySlice = createSlice({
	name: 'salary',
	initialState,
	reducers: {
		readSalary: (state, action) => state.filter((record) => record.userId === action.payload),
		addSalary: (state, action) => {
			const {userId, salaryData} = action.payload;
			state.push({id: Date.now(), userId, ...salaryData});
		},
		updateSalary: (state, action) => {
			const {id, updatedData} = action.payload;
			const index = state.findIndex((record) => record.id === id);
			if (index !== -1) {
				state[index] = {...state[index], ...updatedData};
			}
		},
		deleteSalary: (state, action) => {
			const id = action.payload;
			return state.filter((record) => record.id !== id);
		},
	},
});

export const {readSalary, addSalary, updateSalary, deleteSalary} = salarySlice.actions;
export default salarySlice.reducer;

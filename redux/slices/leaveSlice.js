import { createSlice } from '@reduxjs/toolkit';

const leaveSlice = createSlice({
	name: 'leave',
	initialState: [],
	reducers: {
		addLeave: (state, action) => {
			state.push({ ...action.payload.leaveData, id: Date.now(), userId: action.payload.userId });
		},
		updateLeave: (state, action) => {
			const index = state.findIndex((leave) => leave.id === action.payload.id);
			if (index !== -1) {
				state[index] = { ...state[index], ...action.payload.updatedData };
			}
		},
		deleteLeave: (state, action) => {
			return state.filter((leave) => leave.id !== action.payload);
		},
	},
});

export const { addLeave, updateLeave, deleteLeave } = leaveSlice.actions;
export default leaveSlice.reducer;

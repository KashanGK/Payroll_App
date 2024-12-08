import {createSlice} from '@reduxjs/toolkit';

const initialState = []; // Array of attendance records with userId

const attendanceSlice = createSlice({
	name: 'attendance',
	initialState,
	reducers: {
		readAttendance: (state, action) => state.filter((record) => record.userId === action.payload),
		addAttendance: (state, action) => {
			const {userId, attendanceData} = action.payload;
			state.push({id: Date.now(), userId, ...attendanceData});
		},
		updateAttendance: (state, action) => {
			const {id, updatedData} = action.payload;
			const index = state.findIndex((record) => record.id === id);
			if (index !== -1) {
				state[index] = {...state[index], ...updatedData};
			}
		},
		deleteAttendance: (state, action) => {
			const id = action.payload;
			return state.filter((record) => record.id !== id);
		},
	},
});

export const {readAttendance, addAttendance, updateAttendance, deleteAttendance} = attendanceSlice.actions;
export default attendanceSlice.reducer;

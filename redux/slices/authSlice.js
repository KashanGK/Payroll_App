import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
			localStorage.setItem('isLoggedIn', JSON.stringify(true)); // Persist to localStorage
		},
		logout: (state) => {
			state.isLoggedIn = false;
			localStorage.setItem('isLoggedIn', JSON.stringify(false)); // Persist to localStorage
		},
	},
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;

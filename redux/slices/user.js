import {createSlice} from '@reduxjs/toolkit';

// Utility function to generate a unique ID
const generateUniqueId = () => Date.now() + Math.random().toString(36).substring(2);

const initialState = {
	users: JSON.parse(localStorage.getItem('users')) || [
		{
			id: generateUniqueId(),
			name: 'Kashan',
			title: 'Front-end Developer',
			email: 'kashan47@gmail.com',
			role: 'Student',
		},
	],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			const newUser = {id: generateUniqueId(), ...action.payload}; // Add unique ID
			state.users.push(newUser);
			localStorage.setItem('users', JSON.stringify(state.users));
		},
		deleteUser: (state, action) => {
			state.users = state.users.filter(user => user.id !== action.payload); // Use `id` instead of `email`
			localStorage.setItem('users', JSON.stringify(state.users));
		},
		editUser: (state, action) => {
			const index = state.users.findIndex(user => user.id === action.payload.id); // Use `id` for lookup
			if (index !== -1) {
				state.users[index] = action.payload;
				localStorage.setItem('users', JSON.stringify(state.users));
			}
		},
	},
});

export const {addUser, deleteUser, editUser} = userSlice.actions;
export default userSlice.reducer;

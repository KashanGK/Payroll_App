import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/user.js';
import attendanceReducer from './slices/attendanceSlice.js';
import salaryReducer from "./slices/salarySlice.js";
import taxReducer from './slices/taxSlice';
import authReducer from './slices/authSlice.js';
import leaveReducer from './slices/leaveSlice.js'

const rootReducer = combineReducers({
	user: userReducer,
	attendance: attendanceReducer,
	salary: salaryReducer,
	tax: taxReducer,
	auth: authReducer,
	leave: leaveReducer
});

export default rootReducer;




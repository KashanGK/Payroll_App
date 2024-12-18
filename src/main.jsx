// src/main.js or src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {store} from '../redux/store.js';
import './App.css';



ReactDOM.render(<React.StrictMode>
	<Provider store={store}>
		<App/>
	</Provider>
</React.StrictMode>, document.getElementById('root'));

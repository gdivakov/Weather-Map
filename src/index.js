import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {combineReducers} from 'redux-immutable'
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import main from './reducers/main';

import App from './components/App';

const reducer = combineReducers({
	main
});

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
<Provider store={store}>
	<Router>
		<div>
			<Route exact path="/" component={App} />
		</div>
	</ Router>
</ Provider>, document.getElementById('root'));
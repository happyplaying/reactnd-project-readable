import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore} from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'


//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
 	<Provider store={store}>
    	<BrowserRouter><App /></BrowserRouter>
  	</Provider>,
  	document.getElementById('root')
)

registerServiceWorker();

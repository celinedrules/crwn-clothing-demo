import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import CustomizedSnackbars from './components/snackbar/snackbar.component';

ReactDOM.render(
	<Provider store={store}>
		<CustomizedSnackbars />
		<BrowserRouter>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<HashRouter>
// 				<PersistGate persistor={persistor}>
// 					<App />
// 				</PersistGate>
// 			</HashRouter>
// 		</Provider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

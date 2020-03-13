import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// import { persistor } from './store'
// import { PersistGate } from 'redux-persist/lib/integration/react';

import { ConfigProvider } from 'antd';
import App from './App';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		{/*<PersistGate loading={null} persistor={persistor}>*/}
			<HashRouter>
				<ConfigProvider locale={zhCN}>
					<App />
				</ConfigProvider>
			</HashRouter>
		{/*</PersistGate>*/}
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

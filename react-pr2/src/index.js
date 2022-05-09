import { SnackbarProvider } from 'notistack';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/reset.scss';
import './assets/styles/global.scss';
import './i18n';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

ReactDOM.render(
  <Suspense fallback="">
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

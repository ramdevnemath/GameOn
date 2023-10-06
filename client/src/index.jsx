import React from 'react';
import App from "./App"
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
      </Provider>
  </React.StrictMode>
);

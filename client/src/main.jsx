// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './components/ui/sonner.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';

import App from './App.jsx';
import './index.css';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

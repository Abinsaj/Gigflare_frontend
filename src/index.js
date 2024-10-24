import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store, { persistor } from './Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { Toaster } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <>
          <Toaster richColors position="top-center" />
          <App />
        </>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);



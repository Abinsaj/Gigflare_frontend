import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store, { persistor } from './Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
console.log(process.env,'this is the client id')

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <GoogleOAuthProvider clientId = {clientId} >
          <>
            <Toaster richColors position="top-center" />
            <App />
          </>
        </GoogleOAuthProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);



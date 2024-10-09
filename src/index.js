import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './Redux/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { Toaster } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <>
          <Toaster richColors position="top-center"/>
          <App />
        </>
      </React.StrictMode>
  </Provider>
  
);



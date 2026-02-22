import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';
import AuthProvider from './context/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx'; // adjust the path if your router file is elsewhere


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthProvider>
  </CartProvider>
);

reportWebVitals();




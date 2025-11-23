import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
// --- ¡NUEVO! ---
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --- ¡NUEVO! Pega tu ID aquí --- */}
    <GoogleOAuthProvider clientId="1063049315867-f80f5pfj6m5q5cfsld3k71b11u5f0orf.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
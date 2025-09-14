import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Admin from './components/Admin.jsx';
import User from './components/User.jsx';
import AuthProvider from "./services/AuthContext"; // default export ✅

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="124557818567-gbrs84k69shs06ihet41nrhre7dnb9ao.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)

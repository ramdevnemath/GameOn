import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignup";
import UserHome from "./pages/user/UserHome";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import AdminLogin from "./pages/admin/adminLogin"
import Dashboard from "./pages/admin/Dashboard";
import UserProfile from "./pages/user/UserProfile";
import UsersList from "./pages/admin/UsersList";
import "./App.css"

function App() {

  const client_id = "490901314465-fip3q037ppq42muqegj6jl2g5lgasjrj.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <Router>
        <Routes>
          <Route path="/" Component={UserHome} />
          <Route path="/user/login" Component={UserLogin} />
          <Route path="/user/signup" Component={UserSignUp} />
          <Route path="/user/forgot-password" Component={ForgotPassword} />
          <Route path="/user/password-reset/:id/:token" Component={ResetPassword} />
          <Route path="/admin/login" Component={AdminLogin} />
          <Route path="/user/profile" Component={UserProfile} />
          <Route path="/admin/dashboard" Component={Dashboard} />
          <Route path="/admin/users-list" Component={UsersList} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;

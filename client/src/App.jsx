import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignup";
import UserHome from "./pages/user/UserHome";
import "./App.css"
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  const client_id = "490901314465-fip3q037ppq42muqegj6jl2g5lgasjrj.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <Router>
        <Routes>
          <Route path="/" Component={UserHome} />
          <Route path="/login" Component={UserLogin} />
          <Route path="/signup" Component={UserSignUp} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

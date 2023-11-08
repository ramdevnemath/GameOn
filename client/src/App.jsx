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
import Vendors from "./pages/admin/Vendors";
import VendorDetails from "./pages/admin/VendorDetails";
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorForgotPassword from "./pages/vendor/ForgotPassword"
import VendorDashboard from "./pages/vendor/Dashboard";
import VerifyAdmin from "./components/admin/VerifyAdmin";
import AddTurfDetails from "./pages/vendor/AddTurfDetails";
import VerifyVendor from "./components/vendor/VerifyVendor";
import Venues from "./pages/user/venues";
import VendorProfile from "./pages/vendor/VendorProfile";
import ViewTurf from "./pages/user/ViewTurf";
import VerifyUser from "./components/user/VerifyUser";
import "./App.css"

function App() {

  const client_id = "490901314465-fip3q037ppq42muqegj6jl2g5lgasjrj.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <Router>
        <Routes>

          <Route path="/" Component={UserHome} />
          <Route path="/home" Component={UserHome} />
          <Route path="/user/profile" Component={UserProfile} />
          <Route path="/user/login" Component={UserLogin} />
          <Route path="/user/signup" Component={UserSignUp} />
          <Route path="/user/forgot-password" Component={ForgotPassword} />
          <Route path="/venues" Component={Venues} />

          <Route path="/venues" Component={VerifyUser}>
            <Route path="/venues/view-turf" Component={ViewTurf} />
          </Route>

          <Route path="/password-reset/:id/:token" Component={ResetPassword} />

          <Route path="/admin" Component={VerifyAdmin}>
            <Route index path="/admin/dashboard" Component={Dashboard} />
            <Route path="/admin/users-list" Component={UsersList} />
            <Route path="/admin/vendors-list" Component={Vendors} />
            <Route path="/admin/vendor-details/:id" Component={VendorDetails} />
          </Route>
          
          <Route path="/admin/login" Component={AdminLogin} />

          <Route path="/vendor" Component={VerifyVendor}>
            <Route index path="/vendor/dashboard" Component={VendorDashboard} />
            <Route path="/vendor/turf-details" Component={AddTurfDetails} />
            <Route path="/vendor/profile" Component={VendorProfile} />
          </Route>

            <Route path="/vendor/forgot-password" Component={VendorForgotPassword} />
            <Route path="/vendor/login" Component={VendorLogin} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;

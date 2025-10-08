import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Contact from "./General/Contact";
import About from "./General/About";
import Terms from "./General/Terms&Conditions";
import Home from "./General/Home";

// ProtectedRoute component we created earlier
import ProtectedRoute from "./Routes/ProtectedRoute";

// Pages that need protection
import Dashboard from "./Admin/Dashboard";
import Blogs from "./Pages/Blogs";
import Profile from "./Pages/Profile";
import AdminPanel from "./Admin/AdminPanel";
import PostDetails from "./Pages/PostDetails";
import PrivacyPolicy from "./General/PrivacyPolicy";
import CookiePolicy from "./General/CookiePolicy";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />

          {/* Protected routes (any logged-in user) */}
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} requireAdmin/>} />
          <Route path="/post/:id" element={<PostDetails />} />

          <Route path="/blogs" element={<ProtectedRoute component={Blogs} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />

          {/* Admin-only route */}
          <Route path="/admin" element={<ProtectedRoute component={AdminPanel} requireAdmin />} />
          


          <Route path="/t&c" element={<Terms />} />
          <Route path="/cookie" element={<CookiePolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

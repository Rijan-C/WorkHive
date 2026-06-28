import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import FreelancerDashboard from "./pages/freelancer/Dashboard";
import ClientDashboard from "./pages/client/Dashboard";
import Profile from "./pages/freelancer/Profile"; 
import CreateGig from "./pages/freelancer/createGig";

function App() {
  return (
    <Routes>
      
      {/* Pages with Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Pages without Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route path ="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer/profile" element={<Profile />} />
        <Route path="/freelancer/createGig" element={<CreateGig />} />
      </Route>

    </Routes>
  );
}

export default App;

import React from "react";
import UserRoutes from "./Routes/userRoutes";
import AdminRoutes from "./Routes/adminRoutes";
import FreelancerRoutes from "./Routes/freelancerRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (

    <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin*" element={<AdminRoutes />} />
          <Route path="/freelancer/*" element={<FreelancerRoutes />} />
        </Routes>
    </Router>
  );
}

export default App;

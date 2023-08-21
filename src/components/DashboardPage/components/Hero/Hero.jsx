import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  DashboardForm,
  Profile,
  ContractorBooking,
  AdminDashboard,
  AdminWorkforceList,
  UpdateLabourDetails,
  AdminBookings,
  AllocateLabours,
  Report
} from "../../Pages";

const Hero = ({ userRole }) => {
  return (
    <div className="container-fluid m-0 p-0">
      {userRole === '"Contractor"' ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboardform" element={<DashboardForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contractor-bookings" element={<ContractorBooking />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/workforce-list" element={<AdminWorkforceList />} />
          <Route
            path="/update-labour-details"
            element={<UpdateLabourDetails />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/check-bookings" element={<AdminBookings />} />
          <Route path="/allocate-labours" element={<AllocateLabours />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      )}
    </div>
  );
};

export default Hero;

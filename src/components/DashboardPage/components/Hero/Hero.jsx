import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Logout from '../../../../Pages/Logout/Logout';

const Hero = ({ userRole }) => {

  const navigate = useNavigate();

  return (
    <div className="container-fluid m-0 p-0">
      {userRole === 'Contractor' ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboardform" element={<DashboardForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contractor-bookings" element={<ContractorBooking />} />
        </Routes>
      ) : (
        userRole === 'Admin' ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/make-booking" element={<Dashboard />} />
            <Route path="/dashboardform" element={<DashboardForm />} />
            <Route path="/workforce-list" element={<AdminWorkforceList />} />
            <Route path="/update-labour-details" element={<UpdateLabourDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/check-bookings" element={<AdminBookings />} />
            <Route path="/allocate-labours" element={<AllocateLabours />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        ) : (
          <Logout />
        )
      )}
    </div>
  );
};

export default Hero;
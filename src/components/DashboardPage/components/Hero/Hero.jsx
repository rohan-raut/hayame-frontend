import React from 'react'
import { Routes, Route } from "react-router-dom"
// import { Dashboard, Customers, Profile, AdminDashboard, AdminWorkforceList, AdminBookings, AllocateLabours } from '../../Pages'
import { Dashboard } from '../../Pages'
import DashboardForm from '../../Pages/ContractorDashboard/DashboardForm'
// import UpdateLabourDetails from '../../Pages/UpdatelabourDetails/UpdateLabourDetails'

const Hero = ({ userRole }) => {

  return (
    <div className="container-fluid m-0 p-0">
      { userRole==='"Contractor"' ? (<Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboardform" element={<DashboardForm />} />
        {/* <Route path="/customers" element={<Customers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customers" element={<Customers />} /> */}
      </Routes>) : (<Routes>
        {/* <Route path='/' element={<AdminDashboard />} />
        <Route path='/workforce-list' element={<AdminWorkforceList />} />
        <Route path='/check-bookings' element={<AdminBookings />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-labour-details' element={<UpdateLabourDetails />} />
        <Route path='/allocate-labours' element={<AllocateLabours />} /> */}
      </Routes>)}
    </div>
  )
}

export default Hero
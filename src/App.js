import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import About from "./Pages/About/About";
import Logout from "./Pages/Logout/Logout";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import VerifyUser from "./Pages/VerifyUser/VerifyUser";
import DashboardPage from "./components/DashboardPage/DashboardPage";
// import {
//   Dashboard,
//   Customers,
//   Profile,
//   AdminWorkforceList,
//   AdminBookings,
//   AllocateLabours,
// } from "./components/DashboradPage/Pages";
import DashboardForm from "./components/DashboardPage/Pages/ContractorDashboard/DashboardForm";
// import UpdateLabourDetails from "./components/DashboradPage/Pages/UpdatelabourDetails/UpdateLabourDetails";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/about-us",
      element: <About />,
    },
    {
      path: "/verify-user",
      element: <VerifyUser />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
    //     {
    //       path: "/dashboard/profile",
    //       element: <Profile />,
    //     },
    //     {
    //       path: "/dashboard/customers",
    //       element: <Customers />,
    //     },
        {
          path: "/dashboard/dashboardform",
          element: <DashboardForm />,
        },
    //     {
    //       path: "/dashboard/workforce-list",
    //       element: <AdminWorkforceList />,
    //     },
    //     {
    //       path: "/dashboard/check-bookings",
    //       element: <AdminBookings />,
    //     },
    //     {
    //       path: "/dashboard/update-labour-details",
    //       element: <UpdateLabourDetails />,
    //     },
    //     {
    //       path: "/dashboard/allocate-labours",
    //       element: <AllocateLabours />,
    //     },
      ],
    // },
    // {
    //   path: "/dashboard/dashboard",
    //   element: <Dashboard />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <div>
      <LandingPage />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

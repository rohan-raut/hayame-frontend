import React from "react";
// import { NavbarDashboard } from "../LandingPage/components";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Hero from "./components/Hero/Hero";
// import Footer from "./components/Footer/Footer";
import "./dashboardPage.css";

const DashboardPage = () => {
  let user_role = localStorage.getItem("user_role");

  return (
    <div className="dashboard-container-fluid">
      <Header />
      <div className="DashboardPageContent m-0">
        <Sidebar userRole={user_role} />
        <Hero userRole={user_role} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardPage;

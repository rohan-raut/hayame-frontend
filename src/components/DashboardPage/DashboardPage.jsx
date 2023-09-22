import React, { useEffect, useState } from "react";
// import { NavbarDashboard } from "../LandingPage/components";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Hero from "./components/Hero/Hero";
// import Footer from "./components/Footer/Footer";
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkIfLogin = () => {
      if (localStorage.getItem("token") === null) {
        navigate("/login");
      }
      else {
        fetch("https://django.hayame.my/api/user-info", {
          method: "GET",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setUserRole(json.user_role);
          });
      }
    };

    checkIfLogin();

  }, []);


  return (
    <div className="dashboard-container-fluid">
      <Header />
      {userRole !== null ? (
        <div className="DashboardPageContent m-0">
          <Sidebar userRole={userRole} />
          <Hero userRole={userRole} />
        </div>
      ) :
        (<div></div>)
      }


    </div>
  );
};

export default DashboardPage;

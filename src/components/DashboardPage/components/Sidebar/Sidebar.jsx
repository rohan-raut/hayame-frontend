import React, { useState } from "react";
import "./sidebar.css";
import { Menu, Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { logo, leftarrow, Logo } from "../../../../assets";
import LandingPage from "../../../LandingPage/LandingPage";
import About from "../../../../Pages/About/About";

const Sidebar = ({ userRole }) => {
  // const location = useLocation()
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="Sidebar">
      {showMenu ? (
        <Layout.Sider>
          <div className="sidebar-menu">
            <div className="sider">
              <div className="sider-logo">
                <img src={Logo} />
              </div>
              <div className="sider-arrow">
                <img src={leftarrow} onClick={toggleMenu} />
              </div>
            </div>
            {userRole === '"Contractor"' ? (
              <Menu
                className="sidebar-antd-menu"
                theme="dark"
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
                items={[
                  {
                    label: "Home",
                    key: "/",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Dashboard",
                    key: "./",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "My Account",
                    key: "./inventory",
                    children: [
                      {
                        label: "Profile",
                        key: "./profile",
                      },
                      {
                        label: "Logout",
                        key: "/logout",
                      },
                    ],
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Bookings",
                    key: "./contractor-bookings",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "About Us",
                    key: "/about-us",
                    className: "sidebar-menu-item",
                  },
                ]}
              ></Menu>
            ) : (
              <Menu
                className="sidebar-antd-menu"
                theme="dark"
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
                items={[
                  {
                    label: "Home",
                    key: "/",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Add Workforce",
                    key: "./",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "My Account",
                    key: "./inventory",
                    children: [
                      {
                        label: "Profile",
                        key: "./profile",
                      },
                      {
                        label: "Logout",
                        key: "/logout",
                      },
                    ],
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Check Bookings",
                    key: "./check-bookings",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Workforce List",
                    key: "./workforce-list",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Report",
                    key: "./report",
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "About Us",
                    key: "/about-us",
                    className: "sidebar-menu-item",
                  },
                ]}
              ></Menu>
            )}
          </div>
        </Layout.Sider>
      ) : (
        <div className="closedSidebar">
          <div
            className="closedSidebarArrow"
            style={{ border: "solid 3.5px #17262B" }}
          >
            <img
              src={leftarrow}
              style={{ transform: "rotate(180deg)" }}
              onClick={toggleMenu}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

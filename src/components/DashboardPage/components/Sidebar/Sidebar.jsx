import React, { useState, useEffect, createContext, useContext } from "react";
import "./sidebar.css";
import { Menu, Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { logo, leftarrow, Logo } from "../../../../assets";
import { BellFilled } from "@ant-design/icons";
import LandingPage from "../../../LandingPage/LandingPage";
import About from "../../../../Pages/About/About";
import { notif } from "../../Pages/Notifications/Notifications";

const Sidebar = ({ userRole }) => {
  // const location = useLocation()
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [noti, setNoti] = useState(true);


  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (window.screen.width <= 768) {
      setShowMenu(false);
    }

    const checkNotifications = () => {
      fetch("https://django.hayame.my/api/notifications", {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // setNotifications(json);
          json.forEach((element) => {
            if (element.is_read === false) {
              setNoti(false);
            }
          });
        });
    }

    checkNotifications();
    setInterval(checkNotifications, 300000);


  }, []);

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
            {userRole === "Contractor" ? (
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
            ) : userRole === "Admin" ? (
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
                    label: "Make Booking",
                    key: "./make-booking",
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
                    label: "Notifications",
                    key: "./notifications",
                    className: "sidebar-menu-item",
                    itemIcon:
                      noti == false ? (
                        <BellFilled style={{ color: "red" }} />
                      ) : (
                        <BellFilled />
                      ),
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
            ) : (
              <div></div>
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

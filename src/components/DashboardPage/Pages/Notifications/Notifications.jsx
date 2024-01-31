import { React, useEffect, useState } from "react";
import "./notifications.css";
import NotificationsCard from "./NotificationsCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      fetch("https://django.hayame.my/api/notifications", {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setNotifications(json);
        });
    }

    fetchNotifications();
    setInterval(fetchNotifications, 300000);


    fetch("https://django.hayame.my/api/update/notifications", {
      method: "PUT",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });


  }, []);

  return (
    <div>
      <div className="row justify-content-center m-0">
        <div className="col-10 col-sm-10 col-md-11 col-lg-6 mt-4 m-auto">
          <h3 className="d-flex justify-content-start fw-bolder text-#17262B ">
            Notifications
          </h3>
          <div className="notification-container">
            <ul className="list-unstyled">
              {notifications.map((notif) => (
                <li>
                  <NotificationsCard
                    contractor_name={notif.contractor_name}
                    labour_type={notif.labour_skill}
                    notification_age={notif.age}
                    is_read={notif.is_read}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Notifications;

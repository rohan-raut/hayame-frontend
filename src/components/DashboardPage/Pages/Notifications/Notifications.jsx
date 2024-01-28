import { React, useEffect, useState } from "react";
import "./notifications.css";
import NotificationsCard from "./NotificationsCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <div className="mt-4 p-3 col-lg-7 col-sm-10 m-auto">
      <h3 className="d-flex justify-content-start fw-bolder text-#17262B ">
        Notifications
      </h3>
      <div>
        <ul className="p-2 list-unstyled">
          {notifications.map((notif) => (
            <li className="my-3">
              <NotificationsCard
                contractor_name={notif.contractor_name}
                labour_type={notif.labour_skill}
                notification_age={notif.age}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;

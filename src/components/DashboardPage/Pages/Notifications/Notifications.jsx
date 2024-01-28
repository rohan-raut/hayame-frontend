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
    <div className="border border-danger mt-4 p-3 col-lg-7 col-sm-10 m-auto">
      {/* <div className=" d-flex flex-row justify-content-around  ">
        <h3 className=" ">Notifications</h3>
        <p className=" danger-color ">Mark all as Read</p>
      </div> */}
      <h3 className=" d-flex justify-content-start fw-bolder text-#17262B ">
        Notifications
      </h3>
      <div className="border border-black">
        <ul className="p-2 list-unstyled">
          {/* <li>
            <NotificationsCard
              contractor_name="Joel Scoop"
              labour_type="Hauler"
            />
          </li>
          <li>
            <NotificationsCard
              contractor_name="Samuel Brook"
              labour_type="Waiter"
            />
          </li> */}
          {notifications.map((notif) => (
            <li>
              <NotificationsCard
                contractor_name={notif.contractor_name}
                labour_type={notif.labour_skill}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;

import React from "react";
import "./notifications.css";

const NotificationsCard = ({ contractor_name, labour_type, notification_age, is_read }) => {
  return (
    <div>
      {(is_read == false) ? <div className="d-block text-start notification-card notification-unread">
        <p className="m-0">
          New Booking from <strong>{contractor_name}</strong> for{" "}
          <strong>{labour_type}</strong>
          !!
        </p>
        <p className="notification-age m-0">{notification_age}</p>
      </div> :
        <div className="d-block text-start notification-card notification-read">
          <p className="m-0">
            New Booking from <strong>{contractor_name}</strong> for{" "}
            <strong>{labour_type}</strong>
            !!
          </p>
          <p className="notification-age m-0">{notification_age}</p>
        </div>
      }

    </div>

  );
};

export default NotificationsCard;

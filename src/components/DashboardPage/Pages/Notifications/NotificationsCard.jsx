import React from "react";
import "./notifications.css";

const NotificationsCard = ({ contractor_name, labour_type }) => {
  return (
    <div className="d-block text-start p-2 mb-2 rounded shadow">
      <h5 className="m-0">
        New Booking from <strong>{contractor_name}</strong> for{" "}
        <strong>{labour_type}</strong>
        !!
      </h5>
      <p className="m-0 text-muted">time in hrs</p>
    </div>
  );
};

export default NotificationsCard;

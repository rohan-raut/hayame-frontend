import React, { useEffect } from "react";
import "./dashboard.css";
import {
  bartender,
  construction,
  cook,
  dishwasher,
  foodserviceworker,
  hauler,
  labour,
  lumper,
  pack,
  painter,
  sanitation,
  setup,
  shipping,
  waiter,
} from "../../../../assets";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="row justify-content-center m-0">
      <h2 className="contractor-dashboard-h2">
        Choose the type of Workforce required:
      </h2>

      <div className="col-10 col-sm-10 col-md-5 col-lg-5 contractor-dashboard-card my-4">
        <div className="row contractor-dashboard-skills-row m-0">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <Link
              to="/dashboard/dashboardform?category=General Workers"
              className="contractor-dashboard-link"
            >
              <div className="filter-item" id="labour">
                <img
                  src={construction}
                  alt="labour"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">General Workers</p>
              </div>
            </Link>
          </div>

          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <Link
              to="/dashboard/dashboardform?category=Skilled Workers"
              className="contractor-dashboard-link"
            >
              <div className="filter-item" id="hauler">
                <img
                  src={labour}
                  alt="hauler"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Skilled Workers</p>
              </div>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;

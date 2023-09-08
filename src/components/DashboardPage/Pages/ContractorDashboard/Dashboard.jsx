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
      <div className="col-10 col-sm-10 col-md-11 col-lg-8 contractor-dashboard-card">
        <div className="row contractor-dashboard-skills-row m-0">
          <h3 className="contractor-dashboard-h3">Warehouse</h3>
          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=General Labour"
              className="contractor-dashboard-link"
            >
              <div className="filter-item" id="labour">
                <img
                  src={labour}
                  alt="labour"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">General Labour</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Hauler"
              className="contractor-dashboard-link"
            >
              <div className="filter-item" id="hauler">
                <img
                  src={construction}
                  alt="hauler"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Hauler</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Pick-Pack"
              className="contractor-dashboard-link"
            >
              <div className="filter-item" id="pickpack">
                <img
                  src={labour}
                  alt="pack"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Pick/Pack</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Shipping-Receiving"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="shipping"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Shipping/Receiving</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Lumper"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="lumper"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Lumper</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Sanitation"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="sanitation"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Sanitation</p>
              </div>
            </Link>
          </div>
        </div>
        <hr className="contractor-dashboard-hr" />

        <div className="row contractor-dashboard-skills-row m-0">
          <h3 className="contractor-dashboard-h3">Food</h3>
          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Dishwasher"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="dishwasher"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Dishwasher</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Waiter"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="waiter"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Waiter</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Sanitation"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="sanitation"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Sanitation</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Labour"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="labour"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Labour</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Set up-Tear down"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="setup"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Set up/Tear down</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Cook-Assistant Cook"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="cook"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Cook/Assistant Cook</p>
              </div>
            </Link>
          </div>
        </div>
        <hr className="contractor-dashboard-hr" />

        <div className="row contractor-dashboard-skills-row m-0">
          <h3 className="contractor-dashboard-h3">Restaurant</h3>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Dishwasher"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="dishwasher"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Dishwasher</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Sanitation"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="sanitation"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Sanitation</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Server"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="waiter"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Server</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Set up-Tear down"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="setup"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Set up/Tear down</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Cook-Assistant Cook"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="cook"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Cook/Assistant Cook</p>
              </div>
            </Link>
          </div>
        </div>
        <hr className="contractor-dashboard-hr" />

        <div className="row contractor-dashboard-skills-row m-0">
          <h3 className="contractor-dashboard-h3">Hospitality</h3>
          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboardform?skill=Dishwasher"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="dishwasher"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Dishwasher</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Food Service worker"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="foodserviceworker"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Worker</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Sanitation"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="sanitation"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Sanitation</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Server"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="waiter"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Server</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Cook"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="cook"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Cook</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Bartender"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="bartender"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Bartender</p>
              </div>
            </Link>
          </div>
        </div>
        <hr className="contractor-dashboard-hr" />

        <div className="row contractor-dashboard-skills-row m-0">
          <h3 className="contractor-dashboard-h3">Other</h3>
          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=General Labour"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="labour"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">General Labour</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Painter"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="painter"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Painter</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Construction Workers"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={labour}
                  alt="construction"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Workers</p>
              </div>
            </Link>
          </div>

          <div className="col-4 col-sm-4 col-md-4 col-lg-2">
            <Link
              to="/dashboard/dashboardform?skill=Set up-Tear down"
              className="contractor-dashboard-link"
            >
              <div className="filter-item">
                <img
                  src={construction}
                  alt="setup"
                  className="contractor-dashboard-img"
                />
                <p className="contractor-dashboard-p">Set up/Tear down</p>
              </div>
            </Link>
          </div>
        </div>
        <hr className="contractor-dashboard-hr" />
      </div>
    </div>
  );
};

export default Dashboard;

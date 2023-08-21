import React from "react";
import { Link } from "react-router-dom";
import "./sectFour.css";
import { sectFourContent } from "../../../../../assets";

const SectFour = () => {
  return (
    <div className="sect4-div row justify-content-center m-0">
      <h3 className="sect4-title">Dive deeper into the Businesses we serve</h3>
      <div className="col-11 col-sm-11 col-md-10 col-lg-9 sect4-card">
        <img
          src={sectFourContent}
          alt="Table with types of workers"
          className="sect4-table"
        />
        <div className="my-3">
          <Link to="/dashboard">
            <button className="btn btn-dark book-now-button">
              Book Now!
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SectFour;

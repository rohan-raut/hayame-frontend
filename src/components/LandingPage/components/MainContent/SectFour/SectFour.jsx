import React from "react";
import { Link } from "react-router-dom";
import "./sectFour.css";
import { sectFourContent } from "../../../../../assets";

const SectFour = () => {
  return (
    <div className="sect4-div">
      <h3 className="sect4-title">Dive deeper into the Businesses we serve</h3>
      <div className="sect4-card">
        <img
          src={sectFourContent}
          alt="Table with types of workers"
          className="sect4-table"
        />
        <Link to="/dashboard">
          <button className="btn btn-dark mb-4 py-2 px-4 fs-5">
            Book Now!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SectFour;

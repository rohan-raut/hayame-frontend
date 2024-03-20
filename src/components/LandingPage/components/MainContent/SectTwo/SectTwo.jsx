import React from "react";
import "./sectTwo.css";
import { photogrid } from "../../../../../assets";

const SectTwo = () => {
  return (
    <div className="sect2-div">
      <div className="sect2-card">
        <div className="grid">
          <img src={photogrid} alt="Workers" />
        </div>
        <div className="sect2-content">
          <div>
            <div className="sect2-content-items">
              <h4 className="sect2-content-title">
                Step 1 - Book
              </h4>
            </div>
            <div className="sect2-content-items">
              <h4 className="sect2-content-title">
                Step 2 - Pay
              </h4>
            </div>
            <div className="sect2-content-items">
              <h4 className="sect2-content-title">Step 3 - Clean</h4>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default SectTwo;

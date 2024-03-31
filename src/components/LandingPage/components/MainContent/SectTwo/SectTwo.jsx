import React from "react";
import "./sectTwo.css";
import { photogrid } from "../../../../../assets";

const SectTwo = () => {
  return (
    <div className="py-5">
      <div className="row m-0 sect2-row">
        <div className="col-8 col-sm-8 col-md-6 col-lg-6">
          <div className="grid">
            <img src={photogrid} alt="Workers" />
          </div>
        </div>
        <div className="col-4 col-sm-4 col-md-6 col-lg-6 sect2-content-items">
          <h4 className="sect2-content-title">Step 1 - Book</h4>
          <h4 className="sect2-content-title">Step 2 - Pay</h4>
          <h4 className="sect2-content-title">Step 3 - Clean</h4>
        </div>
      </div>
    </div>



  );
};

export default SectTwo;

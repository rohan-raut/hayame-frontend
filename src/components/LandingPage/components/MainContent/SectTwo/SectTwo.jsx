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
            <h4 className="sect2-content-title">
              Expand your business with us.
            </h4>
            <p className="sect2-content-para">
              Fulfill customer needs and improve your customer experience by
              delivering results on time using extra some helping hands.
            </p>
          </div>
          <div>
            <h4 className="sect2-content-title">
              Opt for an innovative way to hire staff
            </h4>
            <p className="sect2-content-para">
              From hospitality to warehouse skills, we got you covered. Take
              care of tasks at peak hours with us.
            </p>
          </div>
          <div>
            <h4 className="sect2-content-title">Let Us Do the Heavy Lifting</h4>
            <p className="sect2-content-para">
              Our reliable laborers are more than just workers, they're your
              on-demand solution, always at your service.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SectTwo;

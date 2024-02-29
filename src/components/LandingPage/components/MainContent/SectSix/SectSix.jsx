import React from "react";
import "./sectSix.css";

const SectFive = () => {
  return (
    <div className="container">
      <div className="row justify-content-center sect-six-row">
        <h2 className="sect-six-h2">Our Values</h2>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front d-flex align-items-center justify-content-center">
              <h4>Quality</h4>
            </div>
            <div class="flip-card-back d-flex align-items-center justify-content-center">
              <p>We are committed to providing only exceptional manpower services for all.</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front d-flex align-items-center justify-content-center">
              <h4>Motivation</h4>
            </div>
            <div class="flip-card-back d-flex align-items-center justify-content-center">
              <p>Together we are inspired to continuously level up our commitment and energy in propelling the success of our services.</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front d-flex align-items-center justify-content-center">
              <h4>Empowering</h4>
            </div>
            <div class="flip-card-back d-flex align-items-center justify-content-center">
              <p>We strive to entrust everyone with the knowledge and skills to make informed decisions about their career.</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front d-flex align-items-center justify-content-center">
              <h4>Dynamic</h4>
            </div>
            <div class="flip-card-back d-flex align-items-center justify-content-center">
              <p>Full steam ahead, we are swift and versatile in adopting efficient strategies in response to any situation in the manpower industry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectFive;

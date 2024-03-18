import React from "react";
import "./sectOne.css";
import { Link } from "react-router-dom";

const SectOne = () => {
  return (
    <div className="sect1-div">
      {/* <div className="sect1-content">
        <h3>We’re here to make your staffing easier.</h3>
        <p>
          We connect you with individuals who’ll work for as little as two hours
          at a time, allowing you to improve your customer and team experience,
          whilst keeping your costs under control.
        </p>
      </div> */}

      <div className="hero-about-us-card">
        <article>
          <h3>About Us</h3>
          <p>
          At Hayame, we're revolutionizing the way you book cleaning services. With our cutting-edge online platform, we've streamlined the entire process, making it easier and more convenient than ever before to schedule professional cleaning for your home or business. Founded with a passion for innovation and a commitment to exceptional service, Hayame brings together the best of technology and cleaning expertise. Our platform is designed to provide you with a hassle-free experience, allowing you to book your cleaning appointments with just a few clicks, anytime and anywhere.
            {"    "}
            <Link to="./about-us" style={{ color: "#17262B", opacity: "50%" }}>
              ....read more
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
};

export default SectOne;

import React from "react";
import "./sectOne.css";
import { Link } from "react-router-dom";

const SectOne = () => {
  return (
    <div className="sect1-div">
      <div className="sect1-content">
        <h3>We’re here to make your staffing easier.</h3>
        <p>
          We connect you with individuals who’ll work for as little as two hours
          at a time, allowing you to improve your customer and team experience,
          whilst keeping your costs under control.
        </p>
      </div>

      <div className="hero-about-us-card">
        <article>
          <h3>About Us</h3>
          <p>
            HAYAME - A Leading Recruitment & Manpower Web Based company in
            Malaysia. We’re a recruitment technology & manpower supply startup
            founded in 2023 by a group of HR professionals and developers to
            assist both employers and job seekers with their hiring needs. Our
            initial focus was to address the problem of time-consuming and
            inefficient recruitment processes, which our founder, Johannes
            Losgrandes, experienced himself when he was tasked with hiring for
            his company. We realized that many job seekers were also frustrated
            with the lack of transparency and ease in finding job opportunities.
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

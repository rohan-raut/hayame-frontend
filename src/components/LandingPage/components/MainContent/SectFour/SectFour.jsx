import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sectFour.css";
import { DarkCook, DarkLabour, DarkPack, DarkSanitation } from "../../../../../assets";
import { useEffect } from "react";


const SectFour = () => {

  const navigate = useNavigate();
  const google = window.google;

  const handleLabourCard = () => {
    document.getElementById("sectFour-labour-card").style.backgroundColor = "#FFFFFF";
    document.getElementById("sectFour-pack-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-cook-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-sanitation-card").style.backgroundColor = "#d9dbdb";
  }

  const handlePackCard = () => {
    document.getElementById("sectFour-labour-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-pack-card").style.backgroundColor = "#FFFFFF";
    document.getElementById("sectFour-cook-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-sanitation-card").style.backgroundColor = "#d9dbdb";
  }

  const handleCookCard = () => {
    document.getElementById("sectFour-labour-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-pack-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-cook-card").style.backgroundColor = "#FFFFFF";
    document.getElementById("sectFour-sanitation-card").style.backgroundColor = "#d9dbdb";
  }

  const handleSanitationCard = () => {
    document.getElementById("sectFour-labour-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-pack-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-cook-card").style.backgroundColor = "#d9dbdb";
    document.getElementById("sectFour-sanitation-card").style.backgroundColor = "#FFFFFF";
  }

  const handleBookNowForm = () => {
    navigate("/dashboard");
  }


  const handleLocation = () => {
    var id = "location";

    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {
      types: ['geocode'],
    });

    autocomplete.addListener('place_changed', function () {
      var near_place = autocomplete.getPlace();
    });

  }


  return (
    <div className="container sectFour-container">
      <div className="row justify-content-start m-0 sectFour-section-1">
        <div className="col-md-2 col-lg-2 d-flex align-items-center sectFour-icon-card" id="sectFour-labour-card" onClick={handleLabourCard}>
          <img src={DarkLabour} className="sectFour-img" />
          Labour
        </div>
        <div className="col-md-2 col-lg-2 d-flex align-items-center sectFour-icon-card" id="sectFour-pack-card" onClick={handlePackCard}>
          <img src={DarkPack} className="sectFour-img" />
          Pack
        </div>
        <div className="col-md-2 col-lg-2 d-flex align-items-center sectFour-icon-card" id="sectFour-cook-card" onClick={handleCookCard}>
          <img src={DarkCook} className="sectFour-img" />
          Cook
        </div>
        <div className="col-md-2 col-lg-2 d-flex align-items-center sectFour-icon-card" id="sectFour-sanitation-card" onClick={handleSanitationCard}>
          <img src={DarkSanitation} className="sectFour-img" />
          Sanitation
        </div>
        <div className="col-md-4 col-lg-4 d-flex align-items-center">
          <div className="sectFour-text-card">
            <div>
              Looking for a worker?
            </div>
            <div>
              Dive deeper into the business we serve.
            </div>
          </div>
        </div>

      </div>

      <div className="row justify-content-start m-0 sectFour-section-2">
        <form onSubmit={handleBookNowForm}>
          <div className="d-flex">
            <div className="sectFour-form-card border-right pr">
              <label htmlFor="location" className="sectFour-label">Location</label>
              <input type="text" name="location" id="location" className="sectFour-input" onChange={handleLocation} required />
            </div>
            <div className="sectFour-form-card border-right pl pr">
              <label htmlFor="labourCount" className="sectFour-label">Labour Count</label>
              <input type="number" name="labourCount" className="sectFour-input" required />
            </div>
            <div className="sectFour-form-card border-right pl pr">
              <label htmlFor="labourGender" className="sectFour-label">Labour Gender</label>
              <select name="labourGender" className="px-5 sectFour-input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="button-div d-flex align-items-center">
              <button type="submit" className="btn btn-dark px-5 py-3 book-now-btn">Book Now!</button>
            </div>
          </div>
        </form>
      </div>

      {/* for mobile */}
      <div className="row justify-content-center m-0 mobile-section">
        <h3>Looking for a Worker?</h3>
        <div>Dive deeper into the business we serve.</div>
        <form onSubmit={handleBookNowForm}>
          <div className="my-3">
            <button type="submit" className="btn btn-dark">Book Now!</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SectFour;

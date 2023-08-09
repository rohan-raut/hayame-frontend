import React from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import { team } from "../../../../assets";

const Hero = () => {
    let navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (

        <div className="row m-0 align-items-center text-left hero-div py-5">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <h1 className="hero-card-h1">Get your work done with Flexible Workforce.</h1>
                <p className="hero-card-p">
                    <strong>Hayame</strong> bridges the gap between individuals or
                    businesses and staff. We help you hire staff whenever and wherever
                    needed.
                </p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 hero-card-img">
                <img src={team} alt="People working together" />
            </div>
        </div>
    );
};

export default Hero;

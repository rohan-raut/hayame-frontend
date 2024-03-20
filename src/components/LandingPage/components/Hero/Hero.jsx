import React from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import { team, HayameVideo } from "../../../../assets";

const Hero = () => {
    let navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <div>
            {/* <div className="row m-0 justify-content-center align-items-center hero-div">
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 text-center">
                    <h1 className="hero-card-h1">Welcome to Hayame, your on-demand cleaner hiring service. With Hayame, cleanliness is just a click away.</h1>
                    <p className="hero-card-p">
                        Our platform connects you with reliable cleaners tailored to your schedule and needs.
                    </p>
                    <p className="hero-card-p">
                        Experience hassle-free cleaning with <strong>Hayame</strong> today!
                    </p>
                </div>
            </div> */}

            <div className="row m-0 justify-content-center hero-video-content">
                    {/* <img src={team} alt="People working together" /> */}
                    <video src={HayameVideo} autoplay="true" muted className="home-page-video" autoPlay></video>
            </div>

            <div className="row m-0 justify-content-center align-items-center hero-div">
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 text-center hero-div-card">
                    <h1 className="hero-card-h1">Welcome to Hayame, your on-demand cleaning service. With Hayame, cleanliness is just a click away.</h1>
                    <p className="hero-card-p">
                        Experience hassle-free cleaning with <strong>Hayame</strong> today!
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Hero;

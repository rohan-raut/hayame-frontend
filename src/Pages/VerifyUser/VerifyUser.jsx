import React from "react";
import "./verifyUser.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/LandingPage/components";

const VerifyUser = () => {

  const navigate = useNavigate();

  const verifyUserBackend = () => {
    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let user = ""
    for (let pair of queryString.entries()) {
      user = pair[1]
    }

    let api = "https://django.hayame.my/api/verify-user/" + user;

    fetch(api, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });


  }

  verifyUserBackend();


  return (

    <div className="verify-user-container">
      <Navbar />
      <div className="row justify-content-center m-0">
        <div className="col-11 col-sm-11 col-md-6 col-lg-4 verify-user-card">
        <h3>You're verified now! 🎉</h3>
        <Link to="/login" className="login-href">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;

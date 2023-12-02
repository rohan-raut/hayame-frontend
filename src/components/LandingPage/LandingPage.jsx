import React from "react";
// import { Navbar, Hero, MainContent, Footer } from "./components"
import { Navbar, Hero, MainContent, Footer } from "./components";
import "./landingPage.css";
import {
  useGoogleOneTapLogin,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const LandingPage = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div className="landingPage">
      {/* <GoogleOAuthProvider clietnId="204261357577-iekq1nfmpvrp62ogsc1jkotqi4ievo9e.apps.googleusercontent.com"> */}
      {/* <GoogleLogin
          // useGoogleOneTapLogin
          theme="filled_blue"
          size="large"
          ux_mode="popup"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          auto_select
          useOneTap
        /> */}
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select
        useOneTap
        theme="filled_blue"
        size="large"
        ux_mode="popup"
      /> */}
      {/* </GoogleOAuthProvider> */}
      <Navbar />
      <Hero />
      <MainContent />
      <Footer />
    </div>
  );
};

export default LandingPage;

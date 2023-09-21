import React, { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../../components/LandingPage/components";
import AlertMessage from "../../components/Alert/AlertMessage";

const Login = () => {
  let navigate = useNavigate();

  const [loginInputs, setLoginInputs] = useState({});
  const [Alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginInputs(values => ({ ...values, [name]: value }))
  }


  const handleLogin = (e) => {
    e.preventDefault();

    document.getElementById("login-btn").disable = true;

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: loginInputs.email,
        password: loginInputs.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.is_logged_in === true){
          showAlert(json.response, "success");
          localStorage.setItem('token', json.token);
          setTimeout(() => {
            navigate('/dashboard')
          }, 1500);
        }
        else{
          showAlert(json.response, "danger");
        }
      });
  };

  return (

    <div className="login-container">
      <Navbar />
      <AlertMessage alert={Alert} />
      <div className="row justify-content-center m-0">
        <div className="col-11 col-sm-11 col-md-6 col-lg-4 login-card">
          <h1 className="login-h1">Login</h1>
          <p className="text text-normal py-2" style={{ textAlign: "left" }}>
            New user?{" "}
            <span>
              <Link to="/register" style={{ color: "#A2F1FB", textDecoration: "none" }} className="text text-links" >Create an account</Link>
            </span>
          </p>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="form-label login-input-label">Email Address</label>
              <input type="email" value={loginInputs.email || ""} onChange={handleChange} className="form-control login-input-field" id="login-username" name="email" placeholder="Email Address" required />
            </div>
            <div>
              <label htmlFor="password" className="form-label login-input-label">Password</label>
              <input type="password" value={loginInputs.password || ""} onChange={handleChange} className="form-control login-input-field" id="login-password" name="password" placeholder="Password" required />
            </div>
            <div className="d-flex justify-content-between align-items-center my-3">
              <div><Link to="/forgot-password" className="text text-links" style={{ color: "#A2F1FB", textDecoration: "none" }} >Forgot Password</Link></div>
              <div>
                <button type="submit" className="btn login-input-submit" id='login-btn'>Login</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>



  );


};
export default Login;

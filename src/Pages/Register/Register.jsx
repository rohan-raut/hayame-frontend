import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/LandingPage/components";
import AlertMessage from "../../components/Alert/AlertMessage";

const Register = () => {
  const navigate = useNavigate();

  const [registerInputs, setRegisterInputs] = useState({});
  const [Alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterInputs(values => ({ ...values, [name]: value }))
  }

  const validatePassword = (password) => {
    let ok = true;
    var exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(exp)) {
      return true;
    }

    showAlert("Password should contain characters between 6 to 20 which contain at least one numeric digit, one uppercase and one lowercase letter", "danger")
    return false;
  }

  const validatePhone = (phone) => {
    if(phone.length != 10){
      showAlert("Phone Number must be 10 digits.", "danger");
      return false;
    }
    return true;
  }


  const handleRegister = (e) => {
    e.preventDefault();

    document.getElementById("register-btn").disable = true;

    if (registerInputs.password != registerInputs.confirmPassword) {
      showAlert("Password and Confirm-Password does not match", "danger");
    }
    else if (validatePassword(registerInputs.password) && validatePhone(registerInputs.phoneNumber)) {
      fetch("https://django.hayame.my/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: registerInputs.emailAddress,
          first_name: registerInputs.firstName,
          last_name: registerInputs.lastName,
          email: registerInputs.emailAddress,
          password: registerInputs.password,
          password2: registerInputs.confirmPassword,
          phone: registerInputs.phoneNumber,
          user_role: "Contractor",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.response != undefined) {
            showAlert("Successfully Registered. Verify your email before login.", "success");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        });

    }

  };


  return (

    <div className="register-container">
      <Navbar />
      <AlertMessage alert={Alert} />
      <div className="row justify-content-center m-0">
        <div className="col-11 col-sm-11 col-md-8 col-lg-6 register-card p-5">
          <h1 className="register-header-text register-h1">Sign Up</h1>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="firstName" class="form-label register-input-label">First Name</label>
                <input type="text" value={registerInputs.firstName || ""} onChange={handleChange} class="form-control register-input-field" id="firstName" name="firstName" placeholder="First Name" required />
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="lastName" class="form-label register-input-label">Last Name</label>
                <input type="text" value={registerInputs.lastName || ""} onChange={handleChange} class="form-control register-input-field" id="lastName" name="lastName" placeholder="Last Name" required />
              </div>
            </div>

            <div className="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="emailAddress" class="form-label register-input-label">Email Address</label>
                <input type="email" value={registerInputs.emailAddress || ""} onChange={handleChange} class="form-control register-input-field" id="email" name="emailAddress" placeholder="Email Address" required />
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="phoneNumber" class="form-label register-input-label">Phone Number</label>
                <input type="text" value={registerInputs.phoneNumber || ""} onChange={handleChange} class="form-control register-input-field" id="phone_number" name="phoneNumber" placeholder="Phone Number" required />
              </div>
            </div>

            <div className="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="password" class="form-label register-input-label">Password</label>
                <input type="password" value={registerInputs.password || ""} onChange={handleChange} class="form-control register-input-field" id="password" name="password" placeholder="Password" required />
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <label for="confirmPassword" class="form-label register-input-label">Confirm Password</label>
                <input type="password" value={registerInputs.confirmPassword || ""} onChange={handleChange} class="form-control register-input-field" id="cpassword" name="confirmPassword" placeholder="Confirm Password" required />
              </div>
            </div>

            <button type="submit" name="submit" className="btn register-input-submit" id="register-btn">Register</button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Register;

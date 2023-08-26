import React, { useState } from 'react'
import "./resetPassword.css"
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../../components/LandingPage/components';
import AlertMessage from "../../components/Alert/AlertMessage";


const ResetPassword = () => {

    const navigate = useNavigate();

    const [resetPasswordInputs, setResetPasswordInputs] = useState({});
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
        setResetPasswordInputs(values => ({ ...values, [name]: value }))
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

    const handleResetPassword = (e) => {
        e.preventDefault();
        
        let paramString = (window.location.search).split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let token = ""
        for (let pair of queryString.entries()) {
            token = pair[1]
        }

        if (resetPasswordInputs.password != resetPasswordInputs.confirmPassword) {
            showAlert("Password and Confirm-Password does not match", "danger");
        }
        else if (validatePassword(resetPasswordInputs.password)) {
            let api = "https://django.hayame.my/api/reset-password/" + token;
            fetch(api, {
                method: "POST",
                body: JSON.stringify({
                    "password": resetPasswordInputs.password,
                    "confirm_password": resetPasswordInputs.confirmPassword,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    showAlert("Password changed successfully", "success");
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                })
        }


    }


    return (

        <div className="reset-password-container">
            <Navbar />
            <div className="row justify-content-center m-0">
                <div className="col-11 col-sm-11 col-md-6 col-lg-4 reset-password-card">
                    <h1 className="reset-password-h1">Reset Password</h1>
                    <form onSubmit={handleResetPassword}>
                        <div>
                            <label for="password" class="form-label reset-password-input-label">New Password</label>
                            <input type="password" value={resetPasswordInputs.password || ""} onChange={handleChange} className="form-control reset-password-input-field" id="reset-password-password" name="password" placeholder="Password" required />
                        </div>
                        <div>
                            <label for="confirmPassword" class="form-label reset-password-input-label">Confirm Password</label>
                            <input type="password" value={resetPasswordInputs.confirmPassword || ""} onChange={handleChange} className="form-control reset-password-input-field" id="reset-password-confirm-password" name="confirmPassword" placeholder="Confirm New Password" required />
                        </div>
                        <div>
                            <button type="submit" name="reset-password" className="btn reset-password-input-submit" id='reset-password-btn'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default ResetPassword
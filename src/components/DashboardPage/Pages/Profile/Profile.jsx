import React, { useState, useEffect } from 'react';
import "./profile.css";
import { edit, userImg } from "../../../../assets";
import AlertMessage from '../../../Alert/AlertMessage';


const UserProfile = ({ editInfo, setEditInfo, userInfo }) => {
    let user = {
        img: { userImg },
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        user_role: userInfo.userRole,
        email: userInfo.email,
        phone: userInfo.phone,
    }

    const editForm = () => {
        setEditInfo(prev => !prev)
    }

    return (

        <div className="row justify-content-center align-items-center">
            <div className="col-9 col-sm-9 col-md-8 col-lg-5 profile-card">
                <div className="row align-items-center">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 profile-card-img">
                        <img src={userImg} alt="User" />
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 profile-info-part">
                        <h2 className='profile-h3'>{`${user.firstName} ${user.lastName}`}</h2>
                        <h3 className='profile-h3'>Role : <span className='profile-card-span'>{user.user_role}</span></h3>
                        <h3 className='profile-h3'>Email : <span className='profile-card-span'>{user.email}</span></h3>
                        <h3 className='profile-h3'>Phone : <span className='profile-card-span'>{user.phone}</span></h3>
                    </div>
                    <div className="d-flex flex-row-reverse px-4">
                        <button className="btn btn-primary btn-sm" onClick={editForm}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EditForm = ({userInfo}) => {

    const [Inputs, setInputs] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userRole: userInfo.userRole,
        email: userInfo.email,
        phoneNumber: userInfo.phone
    });
    const [Alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleUpdateProfile = (e) => {

        e.preventDefault()

        fetch("https://django.hayame.my/api/update/user-info/" + userInfo.email, {
            method: "PUT",
            body: JSON.stringify({
                "first_name": Inputs.firstName,
                "last_name": Inputs.lastName,
                "phone": Inputs.phoneNumber,
                "user_role": Inputs.userRole
            }),
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                showAlert("User Data Updated Successfully", "success");
            });
    }

    return (

        <div className="row justify-content-center">
            <AlertMessage alert={Alert} />
            <div className="col-9 col-sm-9 col-md-8 col-lg-4 edit-profile-card">
                <form onSubmit={handleUpdateProfile}>
                    <div className="my-3">
                        <img className='profile-edit-img' src={userImg} alt='' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="firstName" className="form-label profile-input-label" >First Name</label>
                        <input type="text" value={Inputs.firstName || ""} onChange={handleChange} name="firstName" className="form-control profile-input-field" placeholder='First Name' required />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="lastName" className="form-label profile-input-label" >Last Name</label>
                        <input type="text" value={Inputs.lastName || ""} onChange={handleChange} name="lastName" className="form-control profile-input-field" placeholder='Last Name' required />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="userRole" className="form-label profile-input-label" >User Role</label>
                        <input type="text" value={Inputs.userRole || ""} onChange={handleChange} name="userRole" className="form-control profile-input-field" placeholder='User Role' disabled />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="email" className="form-label profile-input-label" >Email</label>
                        <input type="text" value={Inputs.email || ""} onChange={handleChange} name="email" className="form-control profile-input-field" placeholder='Email' disabled />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="phoneNumber" className="form-label profile-input-label" >Phone</label>
                        <input type="text" value={Inputs.phoneNumber || ""} onChange={handleChange} name="phoneNumber" className="form-control profile-input-field" placeholder='Phone' required />
                    </div>
                    <div className='my-3'>
                        <button type='submit' className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


const Profile = () => {

    const [editInfo, setEditInfo] = useState(false)
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userRole: ""
    })

    useEffect(() => {
        const getUserInfo = () => {

            fetch("https://django.hayame.my/api/user-info", {
                method: "GET",
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setUserInfo({
                        firstName: json.first_name,
                        lastName: json.last_name,
                        email: json.email,
                        phone: json.phone,
                        userRole: json.user_role
                    });
                });

        };

        getUserInfo();

    }, []);

    return (
        <div id="profile" className='profile'>
            {editInfo ? <EditForm userInfo={userInfo} /> : <UserProfile editInfo={editInfo} setEditInfo={setEditInfo} userInfo={userInfo} />}
        </div>
    )
}

export default Profile
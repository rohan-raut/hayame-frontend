import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import "./updateLabourDetails.css"
// import AdminDashboard from '../AdminDashboard/AdminDashboard'
import Select from "react-select";
import AlertMessage from '../../../Alert/AlertMessage';

let options = [];
let opt = [];
let temp = [];

const UpdateLabourDetails = () => {

    const [Inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passportNumber: "",
        phoneNumber: "",
        gender: ""
    });
    const [Alert, setAlert] = useState(null);
    const [gender, setGender] = useState(null);
    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    let labourSkills = ""
    const [selectedOption, setSelectedOption] = useState([]);

    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let labourEmail = ""
    for (let pair of queryString.entries()) {
        labourEmail = pair[1]
    }

    let navigate = useNavigate()

    useEffect(() => {

        fetch("https://django.hayame.my/api/skill-list", {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    if (opt.includes(json[i]['skill']) == false) {
                        opt.push(json[i]['skill']);
                        options.push({
                            value: json[i]['skill'],
                            label: json[i]['skill']
                        })
                    }
                }
            })



        fetch('https://django.hayame.my/api/labour-list?email=' + labourEmail, {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'

            },
        })           //api for the get request
            .then(response => response.json())
            .then(data => {

                labourSkills = data[0]["skills"].split(",")

                for (let i = 0; i < labourSkills.length; i++) {
                    if (temp.includes(labourSkills[i]) == false) {
                        temp.push(labourSkills[i]);
                        selectedOption.push({
                            value: labourSkills[i],
                            label: labourSkills[i]
                        });
                    }
                }

                // setInputs({ ...Inputs, firstName: data[0]["first_name"] });
                // setInputs({ ...Inputs, lastName: data[0]["last_name"] });
                // setInputs({ ...Inputs, email: data[0]["email"] });
                // setInputs({ ...Inputs, phoneNumber: data[0]["phone"] });
                // setInputs({ ...Inputs, passportNumber: data[0]["passport_no"] });
                // Inputs.firstName = data[0]["first_name"]
                // Inputs.lastName = data[0]["last_name"]
                // Inputs.email = data[0]["email"]
                // gender = data[0]["gender"]
                // Inputs.phoneNumber = data[0]["phone"]
                // Inputs.passportNumber = data[0]["passport_no"]

                setInputs({
                    firstName: data[0]["first_name"],
                    lastName: data[0]["last_name"],
                    email: data[0]["email"],
                    phoneNumber: data[0]["phone"],
                    passportNumber: data[0]["passport_no"],
                    gender: data[0]["gender"]
                })


            })
    }, [])


    const handleUpdate = (e) => {
        e.preventDefault()

        let skills = "";
        for (let i = 0; i < selectedOption.length; i++) {
            skills += selectedOption[i]['value'];
            skills += ',';
        }

        skills = skills.substring(0, skills.length - 1);


        fetch("https://django.hayame.my/api/update/labour-list/" + labourEmail, {
            method: "PUT",
            body: JSON.stringify({
                "first_name": Inputs.firstName,
                "last_name": Inputs.lastName,
                "email": Inputs.email,
                "gender": Inputs.gender,
                "phone": Inputs.phoneNumber,
                "skills": skills,
                "passport_no": Inputs.passportNumber,
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                showAlert("Labour Details Updated", "success");
                setTimeout(() => {
                    navigate('/dashboard/workforce-list');
                }, 2000);
            }
            );

    }


    return (

        <div className="row justify-content-center m-0">
            <AlertMessage alert={Alert} />
            <div className="col-9 col-sm-9 col-md-8 col-lg-5 add-labour-form-card">
                <h2 className="add-labour-form-h2">Update Workforce Details</h2>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="firstName" className="form-label add-labour-input-label" >First Name</label>
                        <input type="text" value={Inputs.firstName || ""} onChange={handleChange} name="firstName" className="form-control add-labour-input-field" placeholder='First Name' required />
                    </div>
                    <div >
                        <label htmlFor="lastName" className="form-label add-labour-input-label" >Last Name</label>
                        <input type="text" value={Inputs.lastName || ""} onChange={handleChange} name="lastName" className="form-control add-labour-input-field" placeholder='Last Name' required />
                    </div>
                    <div >
                        <label htmlFor="email" className="form-label add-labour-input-label" >Email Address</label>
                        <input type="email" value={Inputs.email || ""} onChange={handleChange} name="email" className="form-control add-labour-input-field" placeholder='Email Address' required />
                    </div>
                    <div >
                        <label htmlFor="passportNumber" className="form-label add-labour-input-label" >Passport Number</label>
                        <input type="text" value={Inputs.passportNumber || ""} onChange={handleChange} name="passportNumber" className="form-control add-labour-input-field" placeholder='Passport Number' required />
                    </div>
                    <div>
                        <label htmlFor="gender" className="form-label add-labour-input-label" >Gender</label>
                        <select class="form-control add-labour-input-field" value={Inputs.gender || ""} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="labourSkill" className="form-label add-labour-input-label">Skills</label>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className="form-control add-labour-input-field p-0"
                        />
                    </div>

                    <div >
                        <label htmlFor="phoneNumber" className="form-label add-labour-input-label" >Phone Number</label>
                        <input type="number" value={Inputs.phoneNumber || ""} onChange={handleChange} name="phoneNumber" className="form-control add-labour-input-field" placeholder='Phone Number' required />
                    </div>

                    <div>
                        <input type="submit" className="btn add-labour-input-submit" value="Update" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateLabourDetails
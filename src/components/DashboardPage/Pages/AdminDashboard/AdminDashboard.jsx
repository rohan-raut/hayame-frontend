import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../../Alert/AlertMessage";

let options = [];
let opt = [];

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [gender, setGender] = useState(null);
  const [Inputs, setInputs] = useState({});
  const [Alert, setAlert] = useState(null);

  const navigate = useNavigate();
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/skill-list", {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          options.push({
            value: json[i]["skill"],
            label: json[i]["skill"],
          });
        }
      });
  }, []);


  const handleAddLabour = (e) => {
    e.preventDefault();

    let skills = "";
    for (let i = 0; i < selectedOption.length; i++) {
      skills += selectedOption[i]["value"];
      skills += ",";
    }

    skills = skills.substring(0, skills.length - 1);


    fetch("http://127.0.0.1:8000/api/labour-list", {
      method: "POST",
      body: JSON.stringify({
        first_name: Inputs.firstName,
        last_name: Inputs.lastName,
        email: Inputs.email,
        gender: gender,
        phone: Inputs.phoneNumber,
        skills: skills,
        passport_no: Inputs.passportNumber,
      }),
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        showAlert(json.response, "success");
        setTimeout(() => {
          navigate("/dashboard/workforce-list");
        }, 2000);

      });
  };

  return (

    <div className="row justify-content-center m-0">
      <AlertMessage alert={Alert} />
      <div className="col-9 col-sm-9 col-md-8 col-lg-5 add-labour-form-card">
        <h2 className="add-labour-form-h2">Add Workforce Details</h2>
        <form onSubmit={handleAddLabour}>
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
            <Select
              defaultValue={"Male"}
              onChange={(e) => setGender(e.value)}
              options={genderOptions}
              className="form-control add-labour-input-field p-0"
              required
            />
          </div>
          <div>
            <label htmlFor="labourSkill" className="form-label add-labour-input-label">Skills</label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="form-control add-labour-input-field p-0"
              required
            />
          </div>

          <div >
            <label htmlFor="phoneNumber" className="form-label add-labour-input-label" >Phone Number</label>
            <input type="number" value={Inputs.phoneNumber || ""} onChange={handleChange} name="phoneNumber" className="form-control add-labour-input-field" placeholder='Phone Number' required />
          </div>

          <div>
            <input type="submit" className="btn add-labour-input-submit" value="Add" />
          </div>
        </form>
      </div>
    </div>


  );
};

export default AdminDashboard;

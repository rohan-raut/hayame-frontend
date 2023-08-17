import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./allocateLabours.css";
import AlertMessage from "../../../Alert/AlertMessage";
import { useNavigate } from "react-router-dom";

let options = [];
let labourList = [];

const AllocateLabours = () => {

  let paramString = window.location.search.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let booking_id = "";
  for (let pair of queryString.entries()) {
    booking_id = pair[1];
  }

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState([]);
  const [Alert, setAlert] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    contractorName: "",
    contractorEmail: "",
    skills: "",
    labourCount: 0,
    status: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    amount: 0
  });

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  let requiredSkill = "";

  useEffect(() => {
    fetch("https://django.hayame.my/api/booking?booking_id=" + booking_id, {
      method: "GET",
      headers: {
        Authorization: "Token " + JSON.parse(localStorage.getItem("Token")),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        requiredSkill = json[0]["labour_skill"];
        setBookingDetails({
          contractorName: json[0]['contractor_name'],
          contractorEmail: json[0]['contractor_email'],
          labourSkills: json[0]['labour_skill'],
          labourCount: json[0]['labour_count'],
          status: json[0]['status'],
          startDate: json[0]['start_date'],
          endDate: json[0]['end_date'],
          startTime: json[0]['start_time'],
          endTime: json[0]['end_time'],
          location: json[0]['location'],
          amount: json[0]['amount']
        });
      });

    fetch("https://django.hayame.my/api/labour-list", {
      method: "GET",
      headers: {
        Authorization: "Token " + JSON.parse(localStorage.getItem("Token")),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          let skills = json[i]["skills"].split(",");
          if (skills.includes(requiredSkill)) {
            if (labourList.includes(json[i]["email"]) == false) {
              options.push({
                value: json[i]["email"],
                label: `${json[i]["email"]} (${json[i]["first_name"]} ${json[i]["last_name"]})`,
              });
              labourList.push(json[i]["email"]);
            }

          }
        }
      });
  }, []);

  const validateForm = () => {
    if (selectedOption.length != bookingDetails.labourCount) {
      showAlert(`Select ${bookingDetails.labourCount} labours`, "danger");
      return false;
    }
    return true;
  }

  const handelAllocateLabourSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let labour_emails = "";
      for (let i = 0; i < selectedOption.length; i++) {
        labour_emails += selectedOption[i].value + ",";
      }
      labour_emails = labour_emails.substring(0, labour_emails.length - 1);

      fetch("https://django.hayame.my/api/allocate-labour", {
        method: "POST",
        body: JSON.stringify({
          "booking_id": booking_id,
          "labour_email": labour_emails,
        }),
        headers: {
          'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((json) => {
          showAlert("Labours Allocated Successfully", "success");
          setTimeout(() => {
            navigate("/dashboard/check-bookings");
          }, 2000);
        })
    }

  }

  return (

    <div className="row justify-content-center m-0">
      <AlertMessage alert={Alert} />
      <div className="col-10 col-sm-10 col-md-8 col-lg-5 allocate-labours-card">
        <h3 className="allocate-labours-h3">Contractor Name :{" "}<span className="allocate-labours-summary-span">{bookingDetails.contractorName}</span></h3>
        <h3 className="allocate-labours-h3">Contractor Email :{" "}<span className="allocate-labours-summary-span">{bookingDetails.contractorEmail}</span></h3>
        <h3 className="allocate-labours-h3">Labour Skill :{" "}<span className="allocate-labours-summary-span">{bookingDetails.labourSkills}</span></h3>
        <h3 className="allocate-labours-h3">Booking Status :{" "}<span className="allocate-labours-summary-span">{bookingDetails.status}</span></h3>
        <h3 className="allocate-labours-h3">Start Date :{" "}<span className="allocate-labours-summary-span">{bookingDetails.startDate}</span></h3>
        <h3 className="allocate-labours-h3">End Date :{" "}<span className="allocate-labours-summary-span">{bookingDetails.endDate}</span></h3>
        <h3 className="allocate-labours-h3">Start Time :{" "}<span className="allocate-labours-summary-span">{bookingDetails.startTime}</span></h3>
        <h3 className="allocate-labours-h3">End Time :{" "}<span className="allocate-labours-summary-span">{bookingDetails.endTime}</span></h3>
        <h3 className="allocate-labours-h3">Location :{" "}<span className="allocate-labours-summary-span">{bookingDetails.location}</span></h3>
        <h3 className="allocate-labours-h3">Total Cost :{" "}<span className="allocate-labours-summary-span">{bookingDetails.amount}</span></h3>
        <form onSubmit={handelAllocateLabourSubmit}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className="form-control add-labour-input-field p-0"
            isMulti
            isOptionDisabled={() => selectedOption.length >= bookingDetails.labourCount}
          />
          <div className="my-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AllocateLabours;

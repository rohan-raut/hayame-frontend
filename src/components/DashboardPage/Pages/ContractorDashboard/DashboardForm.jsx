
import React, { useState, useRef } from 'react'
import "./dashboardform.css"
import Dashboard from "./Dashboard"
import { leftarrow } from '../../../../assets'
import { Link, useNavigate } from "react-router-dom"


const DashboardForm = () => {


    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let skill = ""
    for (let pair of queryString.entries()) {
        skill = pair[1]
    }
    let skill_frontend = skill.replace("-", "/");
    let totalCost = 0;

    // const [costDetails, setCostDetails] = useState({})
    let costDetails = {};
    let costDetailsPublicHolidays = {};

    fetch("http://45.127.4.151:8000/api/skill-list", {
        method: "GET",
        headers: {
            'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
            'Content-Type': 'application/json'

        },
    })
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                // setCostDetails(prev => ({
                //     json[i].skill : 
                // }))
                costDetails[json[i].skill] = json[i].cost_per_hour_normal_days;
                costDetailsPublicHolidays[json[i].skill] = json[i].cost_per_hour_public_holiday;
            }
        })




    const [bookingDetails, setBookingDetails] = useState({
        jobLoc: "",
        labourCount: "",
        labourGender: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        labourSkill: skill_frontend,
        hours: "",
        minutes: "",
        publilcHolidays: "",
        costPerHourNormalDays: 0,
        costPerHourPublicHolidays: 0,
        totalCost: 0,
    })

    const [confirmation, setConfirmation] = useState(false);

    const google = window.google;
    const navigate = useNavigate();

    document.addEventListener('DOMContentLoaded', function () {
        let autocomplete;
        let id = 'job-loc';
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {
            types: ['geocode']
        });
    });


    const handleBackArrowClick = () => {
        return (
            <div>
                <Dashboard />
            </div>
        )
    }


    const handleNextClick = () => {
        setConfirmation(prev => !prev)

        let start_time = document.getElementById("start-time").value;
        let end_time = document.getElementById("end-time").value;
        let labourCount = document.getElementById("labour-count").value;
        let jobLocation = document.getElementById("job-loc").value;
        let labourGender = document.getElementById("labour-gender").value;
        let start_date = document.getElementById("start-date").value;
        let end_date = document.getElementById("end-date").value

        let startDate = new Date(start_date);
        let endDate = new Date(end_date);
        const diffTime = Math.abs(endDate - startDate);
        let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // get the public hoildays
        let publilcHolidays = 0;
        fetch("http://45.127.4.151:8000/api/public-holidays", {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    let dt = new Date(json[i]['date']);
                    if (dt >= startDate && dt <= endDate) {
                        publilcHolidays++;
                    }
                }
                totalDays -= publilcHolidays;
                let timeStr = start_time;
                let hour = timeStr[0] + timeStr[1];
                let minutes = timeStr[3] + timeStr[4];

                let startTime = new Date(2023, 6, 3, parseInt(hour), parseInt(minutes));
                timeStr = end_time;
                hour = timeStr[0] + timeStr[1];
                minutes = timeStr[3] + timeStr[4];
                let endTime = new Date(2023, 6, 3, parseInt(hour), parseInt(minutes));

                const diffTime2 = Math.abs(startTime - endTime);
                let totalMinutesOneDay = Math.ceil(diffTime2 / (1000 * 60));

                const costPerMinNormalDays = costDetails[skill] / 60;
                const costPerMinPublicHoliday = costDetailsPublicHolidays[skill] / 60;

                totalCost = (costPerMinNormalDays * totalMinutesOneDay * totalDays * labourCount) + (costPerMinPublicHoliday * totalMinutesOneDay * publilcHolidays * labourCount);
                // totalCost = costPerMin * totalMinutes * parseInt(document.getElementById("labour-count").value);


                setBookingDetails({
                    jobLoc: jobLocation,
                    labourCount: labourCount,
                    labourGender: labourGender,
                    startDate: start_date,
                    endDate: end_date,
                    startTime: start_time,
                    endTime: end_time,
                    labourSkill: skill_frontend,
                    hours: Math.ceil((totalMinutesOneDay * (totalDays + publilcHolidays)) / 60),
                    minutes: ((totalMinutesOneDay * (totalDays + publilcHolidays)) % 60),
                    publilcHolidays: publilcHolidays,
                    costPerHourNormalDays: costDetails[skill],
                    costPerHourPublicHolidays: costDetailsPublicHolidays[skill],
                    totalCost: totalCost,
                })
            })

    }

    const handleConfirmation = () => {

        fetch("http://45.127.4.151:8000/api/booking", {
            method: "POST",
            body: JSON.stringify({
                "contractor_name": JSON.parse(localStorage.getItem("first_name")) + " " + JSON.parse(localStorage.getItem("last_name")),
                "contractor_email": JSON.parse(localStorage.getItem("email")),
                "labour_skill": skill,
                "labour_count": bookingDetails.labourCount,
                "labour_gender": bookingDetails.labourGender, 
                "start_date": bookingDetails.startDate,
                "end_date": bookingDetails.endDate,
                "start_time": bookingDetails.startTime,
                "end_time": bookingDetails.endTime,
                "location": bookingDetails.jobLoc,
                "status": "Pending",
                "amount": bookingDetails.totalCost,
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'

            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert("Booking Done");
                navigate('/dashboard/customers');
            })
    }


    return (
        <div className='dashboard-card'>

            <main className="dashboard-main">
                <div className="dashboard-container">
                    <section className="dashboard-wrapper">
                        <span onClick={handleBackArrowClick}><Link to='/dashboard'><img src={leftarrow} alt="back arrow" className='dashboard-icon-align' /></Link></span>
                        <div className="dashboard-heading">
                            <h1 className="dashboard-header-text">Job Details</h1>
                        </div>
                        {!confirmation ? (<form name="signin" className="dashboard-form">

                            <div className="dashboard-input-control">
                                <label htmlFor="job-loc" className="dashboard-input-label" >Job Location</label>
                                <input type="text" name="job-loc" id="job-loc" required className="contractor-dashboardform-input-field" placeholder='Job Location' />
                            </div>
                            <div className="dashboard-input-control">
                                <label htmlFor="labour-count" className="dashboard-input-label" >Labour Count</label>
                                <input type="number" name="labour-count" id="labour-count" required className="contractor-dashboardform-input-field" placeholder='Labour Count' />
                            </div>

                            <div className="dashboard-input-control">
                                <label htmlFor="labour-gender" className="dashboard-input-label" >Labour Gender</label>
                                <select name="labour-gender" id="labour-gender" className="contractor-dashboardform-input-field">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="dashboard-input-control">
                                <label htmlFor="start-date" className="dashboard-input-label" >Start Date</label>
                                <input type="date" name="start-date" id="start-date" required className="contractor-dashboardform-input-field" placeholder='Start Date' />
                            </div>
                            <div className="dashboard-input-control">
                                <label htmlFor="end-date" className="dashboard-input-label" >End Date</label>
                                <input type="date" name="end-date" id="end-date" required className="contractor-dashboardform-input-field" placeholder='End Date' />
                            </div>
                            <div className='contractor-dashboardform-starttime'>
                                <div className="dashboard-input-control"  >
                                    <label htmlFor="start-time" className="dashboard-input-label" >Start Time</label>
                                    <select name="start-time" id="start-time" className="contractor-dashboardform-input-field">
                                        <option value="00:00">00:00</option>
                                        <option value="00:30">00:30</option>
                                        <option value="01:00">01:00</option>
                                        <option value="01:30">01:30</option>
                                        <option value="02:00">02:00</option>
                                        <option value="02:30">02:30</option>
                                        <option value="03:00">03:00</option>
                                        <option value="03:30">03:30</option>
                                        <option value="04:00">04:00</option>
                                        <option value="04:30">04:30</option>
                                        <option value="05:00">05:00</option>
                                        <option value="05:30">05:30</option>
                                        <option value="06:00">06:00</option>
                                        <option value="06:30">06:30</option>
                                        <option value="07:00">07:00</option>
                                        <option value="07:30">07:30</option>
                                        <option value="08:00">08:00</option>
                                        <option value="08:30">08:30</option>
                                        <option value="09:00">09:00</option>
                                        <option value="09:30">09:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                        <option value="21:00">21:00</option>
                                        <option value="21:30">21:30</option>
                                        <option value="22:00">22:00</option>
                                        <option value="22:30">22:30</option>
                                        <option value="23:00">23:00</option>
                                        <option value="23:30">23:30</option>
                                        <option value="24:00">24:00</option>
                                    </select>
                                </div>

                                <div className="dashboard-input-control">
                                    <label htmlFor="end-time" className="dashboard-input-label" >End Time</label>
                                    <select name="end-time" id="end-time" className="contractor-dashboardform-input-field">
                                        <option value="00:00">00:00</option>
                                        <option value="00:30">00:30</option>
                                        <option value="01:00">01:00</option>
                                        <option value="01:30">01:30</option>
                                        <option value="02:00">02:00</option>
                                        <option value="02:30">02:30</option>
                                        <option value="03:00">03:00</option>
                                        <option value="03:30">03:30</option>
                                        <option value="04:00">04:00</option>
                                        <option value="04:30">04:30</option>
                                        <option value="05:00">05:00</option>
                                        <option value="05:30">05:30</option>
                                        <option value="06:00">06:00</option>
                                        <option value="06:30">06:30</option>
                                        <option value="07:00">07:00</option>
                                        <option value="07:30">07:30</option>
                                        <option value="08:00">08:00</option>
                                        <option value="08:30">08:30</option>
                                        <option value="09:00">09:00</option>
                                        <option value="09:30">09:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                        <option value="21:00">21:00</option>
                                        <option value="21:30">21:30</option>
                                        <option value="22:00">22:00</option>
                                        <option value="22:30">22:30</option>
                                        <option value="23:00">23:00</option>
                                        <option value="23:30">23:30</option>
                                        <option value="24:00">24:00</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashboard-input-control btn">
                                <input type="submit" name="submit" className="dashboard-input-submit" value="Next" id='next-btn' onClick={handleNextClick} />
                            </div>
                        </form>) : (<div className='confirmation-card'>
                            <h3>Job Location : <span className='confirmation-span'>{bookingDetails.jobLoc || "null"}</span></h3>
                            <h3>Labour Skill : <span className='confirmation-span'>{bookingDetails.labourSkill || "null"}</span></h3>
                            <h3>Labour Count : <span className='confirmation-span'>{bookingDetails.labourCount || "null"}</span></h3>
                            <h3>Labour Gender : <span className='confirmation-span'>{bookingDetails.labourGender || "null"}</span></h3>
                            <h3>Start Date : <span className='confirmation-span'>{bookingDetails.startDate || "null"}</span></h3>
                            <h3>End Date : <span className='confirmation-span'>{bookingDetails.endDate || "null"}</span></h3>
                            <h3>Start Time : <span className='confirmation-span'>{bookingDetails.startTime || "null"}</span></h3>
                            <h3>End Time : <span className='confirmation-span'>{bookingDetails.endTime || "null"}</span></h3>
                            <h3>Time: Hours: <span className='confirmation-span'>{bookingDetails.hours}</span> Minutes: <span className='confirmation-span'>{bookingDetails.minutes}</span></h3>
                            <h3>Public Holidays: <span className='confirmation-span'>{bookingDetails.publilcHolidays}</span></h3>
                            <h3>Total Cost Per Hour on Normal Days: <span className='confirmation-span'>{bookingDetails.costPerHourNormalDays}</span></h3>
                            <h3>Total Cost Per Hour on Public Holidays: <span className='confirmation-span'>{bookingDetails.costPerHourPublicHolidays}</span></h3>
                            <h3>Total Cost: <span className='confirmation-span'>{bookingDetails.totalCost}</span></h3>
                            <button className='dashboard-input-submit' type='submit' onClick={handleConfirmation}>Confirm</button>
                        </div>)}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default DashboardForm


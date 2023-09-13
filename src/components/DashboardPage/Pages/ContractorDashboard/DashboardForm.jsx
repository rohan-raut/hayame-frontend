import React, { useState, useEffect } from 'react';
import "./dashboardform.css";
import { useNavigate } from "react-router-dom";
import AlertMessage from '../../../Alert/AlertMessage';
import Select from "react-select";


const DashboardForm = () => {

    const google = window.google;
    const navigate = useNavigate();

    const [Inputs, setInputs] = useState({
        startTime: "00:00",
        endTime: "00:00",
        labourGender: "Male"
    });
    const [Alert, setAlert] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const [skillListOptions, setSkillListOptions] = useState(null);
    const [skillList, setSkillList] = useState(null);
    const [labourSkill, setLabourSkill] = useState(null);

    const [bookingDetails, setBookingDetails] = useState({
        jobLoc: "",
        labourCount: "",
        labourGender: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        labourSkill: "",
        hours: "",
        minutes: "",
        publilcHolidays: "",
        costPerHourNormalDays: 0,
        costPerHourPublicHolidays: 0,
        transportationCost: 0,
        totalCost: 0,
    })

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
        let paramString = (window.location.search).split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let category = ""
        for (let pair of queryString.entries()) {
            category = pair[1]
        }
        category = category.replace(' ', '%20');
        let api = "https://django.hayame.my/api/skill-list?category=" + category;
        console.log(api);
        fetch(api, {
            method: "GET",
            headers: {
                Authorization: "Token " + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                let opt = [];
                setSkillList(json);
                for (let i = 0; i < json.length; i++) {
                    opt.push({
                        value: json[i]["skill"],
                        label: json[i]["skill"],
                    });
                }
                setSkillListOptions(opt);
            });
    }, []);


    const handleJobLocation = () => {
        var id = "jobLocation";

        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {
            types: ['geocode'],
        });

        autocomplete.addListener('place_changed', function () {
            var near_place = autocomplete.getPlace();
            setInputs(values => ({ ...values, ["jobLocation"]: near_place["formatted_address"] }));
        });

    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        if (name === "jobLocation") {
            handleJobLocation();
        }
    }


    const validateForm = () => {
        let startDate = new Date(Inputs.startDate);
        let endDate = new Date(Inputs.endDate);
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (startDate < today) {
            showAlert("Invalid Start Date", "danger");
            return false;
        }

        if (endDate < today) {
            showAlert("Invalid End Date", "danger");
            return false;
        }

        if (endDate < startDate) {
            showAlert("Invalid End Date", "danger");
            return false;
        }

        let startTime = Inputs.startTime;
        let endTime = Inputs.endTime;
        let temp = "";
        temp = startTime[0] + startTime[1];
        let startHour = parseInt(temp);
        let startTimeStamp = (startDate.getTime() + (startHour * 3600000) - 28800000); // minus 28800000 to convert localtime to utc

        temp = startTime[3] + startTime[4];
        let startMin = parseInt(temp);
        temp = endTime[0] + endTime[1];
        let endHour = parseInt(temp);
        temp = endTime[3] + endTime[4];
        let endMin = parseInt(temp);

        let currentTimeStamp = Date.now();

        if (startTime == endTime) {
            showAlert("Start Time and End Time cannot be same", "danger");
            return false;
        }
        if ((endHour < startHour) || (endHour == startHour && endMin < startMin)) {
            showAlert("Invalid End time", "danger");
            return false;
        }

        if ((startTimeStamp - currentTimeStamp) < 7200000) {
            showAlert("Cannot Book within 2 hours", "danger");
            return false;
        }

        return true;
    }


    async function getDistance(jobLocation) {
        let distance = 0;
        var distanceService = new google.maps.DistanceMatrixService();
        await distanceService.getDistanceMatrix({
            origins: ["Persiaran Bukit Raja, Kawasan 17 Bandar Baru Klang, 41150 Klang, Selangor"],
            destinations: [jobLocation],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        },
            function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    console.log('Error:', status);
                } else {
                    distance = response.rows[0].elements[0].distance.value;
                    // $("#distance").text(response.rows[0].elements[0].distance.text).show();
                    // $("#duration").text(response.rows[0].elements[0].duration.text).show();
                }
            });
        return distance / 1000;
    }



    async function handleNextClick(e) {
        e.preventDefault();

        if (validateForm()) {
            let transportation_cost = 0;
            let totalCost = 0;
            let costDetails = {};
            let costDetailsPublicHolidays = {};

            for (let i = 0; i < skillList.length; i++) {
                costDetails[skillList[i].skill] = skillList[i].cost_per_hour_normal_days;
                costDetailsPublicHolidays[skillList[i].skill] = skillList[i].cost_per_hour_public_holiday;
            }

            let distance = await getDistance(Inputs.jobLocation);
            console.log(distance);
            let totals_cars = Math.trunc(Inputs.labourCount / 4);
            if((Inputs.labourCount % 4) != 0){
                totals_cars += 1;
            }

            transportation_cost = distance * totals_cars * 1.5;

            let start_time = Inputs.startTime;
            let end_time = Inputs.endTime;
            let labourCount = Inputs.labourCount;
            let jobLocation = Inputs.jobLocation;
            let labourGender = Inputs.labourGender;
            let start_date = Inputs.startDate;
            let end_date = Inputs.endDate;

            let startDate = new Date(start_date);
            let endDate = new Date(end_date);
            const diffTime = Math.abs(endDate - startDate);
            let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            // get the public hoildays
            let publilcHolidays = 0;
            fetch("https://django.hayame.my/api/public-holidays", {
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

                    const costPerMinNormalDays = costDetails[labourSkill.value] / 60;
                    const costPerMinPublicHoliday = costDetailsPublicHolidays[labourSkill.value] / 60;

                    totalCost = (costPerMinNormalDays * totalMinutesOneDay * totalDays * labourCount) + (costPerMinPublicHoliday * totalMinutesOneDay * publilcHolidays * labourCount) + transportation_cost;


                    setBookingDetails({
                        jobLoc: jobLocation,
                        labourCount: labourCount,
                        labourGender: labourGender,
                        startDate: start_date,
                        endDate: end_date,
                        startTime: start_time,
                        endTime: end_time,
                        labourSkill: labourSkill.value,
                        hours: Math.ceil((totalMinutesOneDay * (totalDays + publilcHolidays)) / 60),
                        minutes: ((totalMinutesOneDay * (totalDays + publilcHolidays)) % 60),
                        publilcHolidays: publilcHolidays,
                        costPerHourNormalDays: costDetails[labourSkill.value],
                        costPerHourPublicHolidays: costDetailsPublicHolidays[labourSkill.value],
                        transportationCost: transportation_cost,
                        totalCost: totalCost,
                    })

                    setConfirmation(prev => !prev)
                })
        }

    }

    const handleConfirmation = () => {

        fetch("https://django.hayame.my/api/booking", {
            method: "POST",
            body: JSON.stringify({
                "contractor_name": JSON.parse(localStorage.getItem("first_name")) + " " + JSON.parse(localStorage.getItem("last_name")),
                "contractor_email": JSON.parse(localStorage.getItem("email")),
                "labour_skill": labourSkill.value,
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
                showAlert("Booking Done", "success");
                setTimeout(() => {
                    navigate('/dashboard/contractor-bookings');
                }, 2000);
            })
    }


    return (

        <div className="row justify-content-center">
            <AlertMessage alert={Alert} />
            <div className="col-9 col-sm-9 col-md-8 col-lg-5 contractor-dashboard-form-card">
                <h2 className='contractor-dashboard-form-h2'>Job Details</h2>
                {!confirmation ? (<form onSubmit={handleNextClick}>
                    <div >
                        <label htmlFor="jobLocation" className="form-label contractor-dashboard-input-label" >Job Location</label>
                        <input type="text" value={Inputs.jobLocation || ""} onChange={handleChange} name="jobLocation" id="jobLocation" className="form-control contractor-dashboardform-input-field" placeholder='Job Location' required />
                    </div>

                    <div>
                        <label htmlFor="labourSkill" className="form-label add-labour-input-label">Labour Skill</label>
                        <Select
                            onChange={setLabourSkill}
                            options={skillListOptions}
                            className="form-control contractor-dashboardform-input-field p-0"
                            required
                        />
                    </div>

                    <div >
                        <label htmlFor="labourCount" className="form-label contractor-dashboard-input-label" >Labour Count</label>
                        <input type="number" value={Inputs.labourCount || ""} onChange={handleChange} name="labourCount" id="labourCount" className="form-control contractor-dashboardform-input-field" placeholder='Labour Count' required />
                    </div>

                    <div >
                        <label htmlFor="labourGender" className="form-label contractor-dashboard-input-label" >Labour Gender</label>
                        <select name="labourGender" value={Inputs.labourGender || ""} onChange={handleChange} id="labourGender" className="form-control contractor-dashboardform-input-field">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div >
                        <label htmlFor="startDate" className="form-label contractor-dashboard-input-label" >Start Date</label>
                        <input type="date" value={Inputs.startDate || ""} onChange={handleChange} name="startDate" id="startDate" className="form-control contractor-dashboardform-input-field" placeholder='Start Date' required />
                    </div>

                    <div >
                        <label htmlFor="endDate" className="form-label contractor-dashboard-input-label" >End Date</label>
                        <input type="date" value={Inputs.endDate || ""} onChange={handleChange} name="endDate" id="endDate" className="form-control contractor-dashboardform-input-field" placeholder='End Date' required />
                    </div>

                    <div className='contractor-dashboardform-starttime'>
                        <div>
                            <label htmlFor="startTime" className="form-label contractor-dashboard-input-label" >Start Time</label>
                            <select name="startTime" value={Inputs.startTime || ""} onChange={handleChange} id="startTime" className="form-control contractor-dashboardform-input-field">
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

                        <div >
                            <label htmlFor="endTime" className="form-label contractor-dashboard-input-label" >End Time</label>
                            <select name="endTime" value={Inputs.endTime || ""} onChange={handleChange} id="endTime" className="form-control contractor-dashboardform-input-field">
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
                        <input type="submit" className="btn contractor-dashboard-form-input-submit" value="Next" id='next-btn' />
                    </div>
                </form>) : (<div>
                    <h3 className='contractor-dashboardform-h3'>Job Location : <span className='confirmation-span'>{bookingDetails.jobLoc || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Skill : <span className='confirmation-span'>{bookingDetails.labourSkill || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Count : <span className='confirmation-span'>{bookingDetails.labourCount || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Gender : <span className='confirmation-span'>{bookingDetails.labourGender || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Start Date : <span className='confirmation-span'>{bookingDetails.startDate || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>End Date : <span className='confirmation-span'>{bookingDetails.endDate || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Start Time : <span className='confirmation-span'>{bookingDetails.startTime || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>End Time : <span className='confirmation-span'>{bookingDetails.endTime || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Time: Hours: <span className='confirmation-span'>{bookingDetails.hours}</span> Minutes: <span className='confirmation-span'>{bookingDetails.minutes}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Transportation Cost : <span className='confirmation-span'>{bookingDetails.transportationCost} RM</span></h3>
                    {bookingDetails.publilcHolidays ? <h3 className='contractor-dashboardform-h3'>Public Holidays: <span className='confirmation-span'>{bookingDetails.publilcHolidays}</span></h3> : ""}
                    <h3 className='contractor-dashboardform-h3'>Total Cost Per Hour on Normal Days: <span className='confirmation-span'>RM {bookingDetails.costPerHourNormalDays}</span></h3>
                    {bookingDetails.publilcHolidays ? <h3 className='contractor-dashboardform-h3'>Total Cost Per Hour on Public Holidays: <span className='confirmation-span'>RM {bookingDetails.costPerHourPublicHolidays}</span></h3> : ""}
                    <h3 className='contractor-dashboardform-h3'>Total Cost: <span className='confirmation-span'>RM {bookingDetails.totalCost}</span></h3>
                    <button className='btn contractor-dashboard-form-input-submit' type='submit' onClick={handleConfirmation}>Confirm</button>
                </div>)}
            </div>
        </div>
    )
}

export default DashboardForm


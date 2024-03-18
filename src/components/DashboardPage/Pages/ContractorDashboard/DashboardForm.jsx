import React, { useState, useEffect } from 'react';
import "./dashboardform.css";
import { useNavigate, Link, redirect } from "react-router-dom";
import AlertMessage from '../../../Alert/AlertMessage';
import Select from "react-select";
import { BackArrow, InstructionIcon } from '../../../../assets'
import md5 from 'md5';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const DashboardForm = () => {

    const google = window.google;
    const navigate = useNavigate();

    const [Inputs, setInputs] = useState({
        startTime: "07:00",
        endTime: "22:00",
        labourGender: "Male"
    });
    const [Alert, setAlert] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const [skillListOptions, setSkillListOptions] = useState(null);
    const [skillList, setSkillList] = useState(null);
    const [labourSkill, setLabourSkill] = useState(null);

    const [bookingDetails, setBookingDetails] = useState({
        bookingId: 0,
        contractorName: "",
        contractorEmail: "",
        jobLoc: "",
        labourCount: 1,
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

        fetch(api, {
            method: "GET",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
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
            types: ['geocode', 'establishment'],
        });

        autocomplete.addListener('place_changed', function () {
            var near_place = autocomplete.getPlace();
            console.log(near_place);
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
        if (name === "labourCount") {
            if (value < 1) {
                showAlert("Minimum 1 Labour should me selected", "danger");
                setInputs(values => ({ ...values, [name]: 1 }))
            }
            if (value > 2) {
                showAlert("Maximum 2 Labour can be Booked", "danger");
                setInputs(values => ({ ...values, [name]: 2 }))
            }
        }
    }


    const validateForm = async () => {
        let startDate = new Date(Inputs.startDate);
        let endDate = new Date(Inputs.endDate);
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        let available_locations = ['Selangor', 'Kuala Lumpur'];
        let canService = false;

        let geocoder = new google.maps.Geocoder();
        let res = await geocoder.geocode({ 'address': Inputs.jobLocation }, await function (results, status) {
            if (status == 'OK') {
                for (let i = 0; i < results[0]['address_components'].length; i++) {
                    if (available_locations.includes(results[0]['address_components'][i]['long_name'])) {
                        canService = true;
                    }
                }
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


        if (canService == false) {
            showAlert("Currently we do not provide Services at this Location", "danger");
            return false;
        }

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
        if (endHour - startHour < 4) {
            showAlert("Minimum Booking of 4 hours required", "danger");
            return false;
        }

        if ((startTimeStamp - currentTimeStamp) < 43200000) {
            showAlert("Cannot Book within 12 hours", "danger");
            return false;
        }

        return true;
    }


    async function handleNextClick(e) {
        e.preventDefault();

        let validationOk = await validateForm();
        if (validationOk == true) {

            console.log(Inputs);

            const booking_preview = await fetch("https://django.hayame.my/api/get-booking-preview", {
                method: "POST",
                body: JSON.stringify({
                    job_location: Inputs.jobLocation,
                    labour_skill: labourSkill.value,
                    labour_count: Inputs.labourCount,
                    labour_gender: "Male",
                    start_date: Inputs.startDate,
                    end_date: Inputs.endDate,
                    start_time: Inputs.startTime,
                    end_time: Inputs.endTime,
                }),
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
            })

            const json = await booking_preview.json()
            console.log(json);
            if (json.success === true) {
                let hr = json.start_time[0] + json.start_time[1];
                let mn = json.start_time[3] + json.start_time[4];
                let st_time = "" + (parseInt(hr) % 12) + ":" + mn;
                if (parseInt(hr) % 12 === 0) {
                    st_time = "12" + ":" + mn;
                }
                if (parseInt(hr) >= 12) {
                    st_time += " PM";
                }
                else {
                    st_time += " AM";
                }

                hr = json.end_time[0] + json.end_time[1];
                mn = json.end_time[3] + json.end_time[4];
                let ed_time = "" + (parseInt(hr) % 12) + ":" + mn;
                if (parseInt(hr) % 12 === 0) {
                    ed_time = "12" + ":" + mn;
                }
                if (parseInt(hr) >= 12 > 0) {
                    ed_time += " PM";
                }
                else {
                    ed_time += " AM";
                }

                setBookingDetails({
                    bookingId: json.booking_id,
                    contractorEmail: json.contractor_email,
                    contractorName: json.contractor_name,
                    jobLoc: json.job_location,
                    labourCount: json.labour_count,
                    labourGender: json.labour_gender,
                    startDate: json.start_date,
                    endDate: json.end_date,
                    startTime: st_time,
                    endTime: ed_time,
                    labourSkill: json.labour_skill,
                    hours: json.hours,
                    minutes: json.mins,
                    publilcHolidays: json.public_holidays,
                    costPerHourNormalDays: ((json.cost_per_hour_normal_days * 100) / 100).toFixed(2),
                    costPerHourPublicHolidays: ((json.cost_per_hour_public_holiday * 100) / 100).toFixed(2),
                    transportationCost: ((json.transportation_cost * 100) / 100).toFixed(2),
                    totalCost: ((json.total_cost * 100) / 100).toFixed(2),
                })

                setConfirmation(prev => !prev)
            }
            else {
                showAlert(json.response, "danger");
            }

        }

    }

    const handleConfirmation = () => {

        let md5hash = md5(bookingDetails.totalCost + "hayamesolutions" + bookingDetails.bookingId + "9d6c2b8c9cdd591ebd27c16ca5720fe4")
        // let md5hash = md5(1 + "hayamesolutions" + bookingDetails.bookingId + "9d6c2b8c9cdd591ebd27c16ca5720fe4")

        let url = "https://pay.merchant.razer.com/RMS/pay/hayamesolutions?amount=" + bookingDetails.totalCost + "&orderid=" + bookingDetails.bookingId + "&bill_name=" + bookingDetails.contractorName + "&bill_email=" + bookingDetails.contractorEmail + "&country=MY&vcode=" + md5hash;

        // let url = "https://pay.merchant.razer.com/RMS/pay/hayamesolutions?amount=1&orderid=1&bill_name=Hayame&bill_email=rohanraut124@gmail.com&country=MY&vcode=977031b48ce8b66a1556482dc77bf0e7"

        window.location.href = url;

        // fetch("https://pay.merchant.razer.com/RMS/pay/hayamesolutions/", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         "amount": bookingDetails.totalCost,
        //         "orderid": 1,
        //         "bill_name": "Hayame - " + bookingDetails.labourSkill,
        //         "bill_email": "rohanraut124@gmail.com",
        //         "country": "MY",
        //         "vcode": md5(bookingDetails.totalCost + "hayamesolutions" + "1" + "9d6c2b8c9cdd591ebd27c16ca5720fe4")
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then((response) => response.text())
        // .then((response) => {
        //     console.log(response);
        //     // return {__html: response}
        // })

        // fetch("https://django.hayame.my/api/booking", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         "labour_skill": labourSkill.value,
        //         "labour_count": bookingDetails.labourCount,
        //         "labour_gender": bookingDetails.labourGender,
        //         "start_date": bookingDetails.startDate,
        //         "end_date": bookingDetails.endDate,
        //         "start_time": bookingDetails.startTime,
        //         "end_time": bookingDetails.endTime,
        //         "location": bookingDetails.jobLoc,
        //         "amount": bookingDetails.totalCost,
        //     }),
        //     headers: {
        //         'Authorization': 'Token ' + localStorage.getItem("token"),
        //         'Content-Type': 'application/json'
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         showAlert(json.response, "success");
        //         setTimeout(() => {
        //             navigate('/dashboard/contractor-bookings');
        //         }, 2000);
        //     })
    }


    const handleBackArrowClick = () => {
        setConfirmation(prev => !prev)
    }


    return (

        <div className="row justify-content-center">
            <AlertMessage alert={Alert} />
            <div className="col-9 col-sm-9 col-md-8 col-lg-5 contractor-dashboard-form-card">
                {confirmation ? (
                    <div className="row align-items-center heading-row py-2 m-0">
                        <div className="col-2">
                            <span onClick={handleBackArrowClick}><img src={BackArrow} alt="back-arrow" className='dashboard-icon-backarrow' /></span>
                        </div>
                        <div className="col-10">
                            <h2 className='contractor-dashboard-form-h2'>Booking Details</h2>
                        </div>
                    </div>
                ) : (<h2 className='contractor-dashboard-form-h2'>Job Details</h2>)}
                {!confirmation ? (<form onSubmit={handleNextClick}>
                    <div >
                        <label htmlFor="jobLocation" className="form-label contractor-dashboard-input-label" >Address</label>
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

                    {/* <div >
                        <label htmlFor="labourGender" className="form-label contractor-dashboard-input-label" >Labour Gender</label>
                        <select name="labourGender" value={Inputs.labourGender || ""} onChange={handleChange} id="labourGender" className="form-control contractor-dashboardform-input-field">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div> */}

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
                                <option value="07:00">07:00 AM</option>
                                <option value="07:30">07:30 AM</option>
                                <option value="08:00">08:00 AM</option>
                                <option value="08:30">08:30 AM</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="09:30">09:30 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="10:30">10:30 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="11:30">11:30 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="12:30">12:30 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="13:30">1:30 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="14:30">2:30 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="15:30">3:30 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="16:30">4:30 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                                <option value="21:30">9:30 PM</option>
                                <option value="22:00">10:00 PM</option>
                            </select>
                        </div>

                        <div >
                            <label htmlFor="endTime" className="form-label contractor-dashboard-input-label" >End Time</label>
                            <select name="endTime" value={Inputs.endTime || ""} onChange={handleChange} id="endTime" className="form-control contractor-dashboardform-input-field">
                                <option value="07:00">07:00 AM</option>
                                <option value="07:30">07:30 AM</option>
                                <option value="08:00">08:00 AM</option>
                                <option value="08:30">08:30 AM</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="09:30">09:30 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="10:30">10:30 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="11:30">11:30 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="12:30">12:30 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="13:30">1:30 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="14:30">2:30 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="15:30">3:30 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="16:30">4:30 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                                <option value="21:30">9:30 PM</option>
                                <option value="22:00">10:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div className="dashboard-input-control btn">
                        <input type="submit" className="btn contractor-dashboard-form-input-submit" value="Next" id='next-btn' />
                    </div>
                </form>) : (<div>
                    {/* <h3 className='contractor-dashboardform-h3'>Address : <span className='confirmation-span'>{bookingDetails.jobLoc || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Skill : <span className='confirmation-span'>{bookingDetails.labourSkill || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Count : <span className='confirmation-span'>{bookingDetails.labourCount || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Labour Gender : <span className='confirmation-span'>{bookingDetails.labourGender || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Start Date : <span className='confirmation-span'>{bookingDetails.startDate || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>End Date : <span className='confirmation-span'>{bookingDetails.endDate || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Start Time : <span className='confirmation-span'>{bookingDetails.startTime || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>End Time : <span className='confirmation-span'>{bookingDetails.endTime || "null"}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Time: Hours: <span className='confirmation-span'>{bookingDetails.hours}</span> Minutes: <span className='confirmation-span'>{bookingDetails.minutes}</span></h3>
                    <h3 className='contractor-dashboardform-h3'>Transportation Cost : <span className='confirmation-span'>RM {bookingDetails.transportationCost}</span></h3>
                    {bookingDetails.publilcHolidays ? <h3 className='contractor-dashboardform-h3'>Public Holidays: <span className='confirmation-span'>{bookingDetails.publilcHolidays}</span></h3> : ""}
                    <h3 className='contractor-dashboardform-h3'>Total Cost Per Hour on Normal Days: <span className='confirmation-span'>RM {bookingDetails.costPerHourNormalDays}</span></h3>
                    {bookingDetails.publilcHolidays ? <h3 className='contractor-dashboardform-h3'>Total Cost Per Hour on Public Holidays: <span className='confirmation-span'>RM {bookingDetails.costPerHourPublicHolidays}</span></h3> : ""}
                    <h3 className='contractor-dashboardform-h3'>Total Cost: <span className='confirmation-span'>RM {bookingDetails.totalCost}</span></h3> */}
                    {/*<button className='btn contractor-dashboard-form-input-submit' type='submit' onClick={handleConfirmation}>Confirm</button>*/}

                    <div className="booking-form-confirmation-table">
                        <table>
                            <tr>
                                <th>Address</th>
                                <td>{bookingDetails.jobLoc || "null"}</td>
                            </tr>
                            <tr>
                                <th>Labour Skill</th>
                                <td>{bookingDetails.labourSkill || "null"}</td>
                            </tr>
                            <tr>
                                <th>Labour Count</th>
                                <td>{bookingDetails.labourCount || "null"}</td>
                            </tr>
                            <tr>
                                <th>Start Date</th>
                                <td>{bookingDetails.startDate || "null"}</td>
                            </tr>
                            <tr>
                                <th>End Date</th>
                                <td>{bookingDetails.endDate || "null"}</td>
                            </tr>
                            <tr>
                                <th>Start Time</th>
                                <td>{bookingDetails.startTime || "null"}</td>
                            </tr>
                            <tr>
                                <th>End Time</th>
                                <td>{bookingDetails.endTime || "null"}</td>
                            </tr>
                            <tr>
                                <th>Total Time</th>
                                <td>{bookingDetails.hours || "0"} Hours {bookingDetails.minutes || "0"} Minutes</td>
                            </tr>
                            <tr>
                                <th>Transportation Cost</th>
                                <td>RM {bookingDetails.transportationCost || "null"}</td>
                            </tr>
                            {bookingDetails.publilcHolidays ? <tr>
                                <th>Public Holidays</th>
                                <td>{bookingDetails.publilcHolidays || "0"}</td>
                            </tr> : ""}
                            <tr>
                                <th>Total Cost Per Hour on Normal Days</th>
                                <td>RM {bookingDetails.costPerHourNormalDays || "null"}</td>
                            </tr>
                            {bookingDetails.publilcHolidays ? <tr>
                                <th>Total Cost Per Hour on Public Holidays</th>
                                <td>RM {bookingDetails.costPerHourPublicHolidays || "null"}</td>
                            </tr> : ""}
                            <tr>
                                <th>Total Cost</th>
                                <td>RM {bookingDetails.totalCost || "null"}</td>
                            </tr>
                        </table>
                    </div>


                    <Popup
                        trigger={<button className='btn contractor-dashboard-form-input-submit'>Confirm</button>}
                        modal
                        nested
                        className="dashboard-booking-confirm-popup"
                    >
                        {close => (
                            <div className="row">
                                <div>
                                    <div className="text-end">
                                        <button className='btn btn-sm btn-outline-dark close' onClick={close}>&times;</button>
                                    </div>
                                    <div className="confirm-booking-content-popup">
                                        <h3 className='text-center confirm-booking-header-popup'>Confirm Your Booking</h3>
                                        <p>Please ensure all details are accurate. Once confirmed, your booking cannot be rescheduled or canceled. If you notice any discrepancies or need assistance, please contact us immediately at <a href="mailto: support@hayame.my">support@hayame.my</a></p>
                                        <p>Thank you for choosing us, and we look forward to providing you with an exceptional experience.</p>
                                        <div className='text-end'>
                                            <button className='btn btn-sm confirm-booking-btn-popup' type='submit' onClick={handleConfirmation}>Confirm</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )}
                    </Popup>

                </div>)}
            </div>

            <div className="text-end">

                <Popup
                    trigger={<span className='booking-form-instruction-btn-img'><img src={InstructionIcon} alt="" /><span>Info</span></span>}
                    modal
                    nested
                    className="tooltip-content"
                >
                    {close => (
                        <div className="row">
                            <div>
                                <div>
                                    <div className="text-end">
                                        <button className='btn btn-sm btn-outline-dark close' onClick={close}>&times;</button>
                                    </div>
                                    <h3 className="tooltip-booking-form-h3">Steps to Make a Successful Booking:</h3>
                                    <ol className="tooltip-ol-booking-form">
                                        <li>Fill out the booking form with your address, skill, number of workers, start and end dates, and start and end times. Currently, we provide services only in the Selangor and Kuala Lumpur regions.</li>
                                        <li>After completing the booking form, click on the Next button. You will see all the details of your booking, including worker and transportation costs.</li>
                                        <li>Click on Confirm if you want to proceed with the booking. A popup message will appear.</li>
                                        <li>Read the message and click on Confirm. You will be redirected to the payment page.</li>
                                        <li>After completing the payment, you will receive the invoice via email.</li>
                                        <li>If you don't receive the invoice after payment or notice any discrepancies while booking, please contact us immediately at support@hayame.my.</li>
                                    </ol>
                                </div>

                            </div>
                        </div>

                    )}
                </Popup>

                {/* <Popup
                    trigger={open => (
                        <button className="btn btn-dark">?</button>
                    )}
                    modal
                    nested
                    className="tooltip-content"
                >
                    <div>
                        <div className="text-end">
                            <button className='btn btn-sm btn-outline-dark close' onClick={close}>&times;</button>
                        </div>
                        <h3 className="tooltip-booking-form-h3">Steps to Make a Successful Booking:</h3>
                        <ol className="tooltip-ol-booking-form">
                            <li>Fill out the booking form with your address, skill, number of workers, start and end dates, and start and end times. Currently, we provide services only in the Selangor and Kuala Lumpur regions.</li>
                            <li>After completing the booking form, click on the Next button. You will see all the details of your booking, including worker and transportation costs.</li>
                            <li>Click on Confirm if you want to proceed with the booking. A popup message will appear.</li>
                            <li>Read the message and click on Confirm. You will be redirected to the payment page.</li>
                            <li>After completing the payment, you will receive the invoice via email.</li>
                            <li>If you don't receive the invoice after payment or notice any discrepancies while booking, please contact us immediately at support@hayame.my.</li>
                        </ol>
                    </div>
                </Popup> */}
            </div>
        </div >
    )
}

export default DashboardForm


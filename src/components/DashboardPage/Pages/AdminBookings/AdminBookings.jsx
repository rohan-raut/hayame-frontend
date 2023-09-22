import React, { useRef, useState, useEffect } from "react";
import "./adminBookings.css";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';

let bookingId = "";

const AdminBookings = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [userDetails, setUserDetails] = useState({
    contractorName: "",
    contractorEmail: "",
    labourSkills: "",
    labourCount: 0,
    status: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    payment: 0
  });

  let navigate = useNavigate();


  const handleDetailsAction = (e) => {
    document.getElementById("detail-card-popup-row-id").style.display = "block";
    bookingId = e.target.parentElement.parentElement.cells[0].innerText

    fetch(
      "https://django.hayame.my/api/booking?booking_id=" + bookingId,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setUserDetails({
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
  };

  const [tableData, setTableData] = useState([]);
  const data = {
    columns: [
      {
        label: "Booking ID",
        field: "bookingID"
      },
      {
        label: "Contractor Name",
        field: "contractorName"
      },
      {
        label: "Contractor Email",
        field: "contractorEmail"
      },
      {
        label: "Skills",
        field: "skills"
      },
      {
        label: "Labour Count",
        field: "labourCount"
      },
      {
        label: "Action",
        field: "action"
      }
    ],
    rows: tableData
  }


  useEffect(() => {
    let d = [];

    const fillTable = async () => {
      const response = await fetch(
        "https://django.hayame.my/api/booking?status=Pending",
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const td = await response.json();
      for (let i = 0; i < td.length; i++) {
        d.push({
          bookingID: td[i]["booking_id"],
          contractorName: td[i]["contractor_name"],
          contractorEmail: td[i]["contractor_email"],
          skills: td[i]["labour_skill"],
          labourCount: td[i]["labour_count"],
          status: td[i]["status"],
          action: <p style={{cursor: "pointer", color: "green"}} onClick={handleDetailsAction}>Details</p>,
        });
      }
      setTableData(d);
    };

    fillTable();
  }, []);


  const handleAllocation = (e) => {
    navigate("/dashboard/allocate-labours?booking_id=" + bookingId);
  };

  const handleCross = () => {
    document.getElementById("detail-card-popup-row-id").style.display = "none"
  }

  return (
    <div>
      <div className="row justify-content-center m-0">
        <div className="col-11 col-sm-11 col-md-11 col-lg-9 contractor-booking-card">
          <MDBDataTable
            responsive
            striped
            bordered
            small
            data={data}
          />
        </div>

        <div className="row justify-content-center detail-card-popup-row" id="detail-card-popup-row-id">
          <div className="col-10 col-sm-10 col-md-8 col-lg-4 contractor-booking-details-card">
            <div className="d-flex flex-row-reverse">
              <span className='detailsCard-cross' style={{ cursor: "pointer" }} onClick={handleCross} >X</span>
            </div>
            <p className='detailsCard-p' id='contractor-contractorName'>{userDetails.contractorName}</p>
            <p className='detailsCard-p' id='contractor-contractorEmail'>{userDetails.contractorEmail}</p>
            <p className='detailsCard-p' >Workforce Type: <span className='detailsCard-span' id='contractor-labourType'>{userDetails.labourSkills}</span></p>
            <p className='detailsCard-p' >Count: <span className='detailsCard-span' id='contractor-labourCount'>{userDetails.labourCount}</span></p>
            <p className='detailsCard-p' >Status: <span className='detailsCard-span' id='contractor-Status'>{userDetails.status}</span></p>
            <div className="d-flex justify-content-between">
              <p className='detailsCard-p'>Start Date: <span className='detailsCard-span' id='contractor-startDate'>{userDetails.startDate}</span></p>
              <p className='detailsCard-p'>End Date: <span className='detailsCard-span' id='contractor-endDate'>{userDetails.endDate}</span></p>
            </div>
            <div className="d-flex justify-content-between">
              <p className='detailsCard-p'>Start Time: <span className='detailsCard-span' id='contractor-startTime'>{userDetails.startTime}</span></p>
              <p className='detailsCard-p'>End Time: <span className='detailsCard-span' id='contractor-endTime'>{userDetails.endTime}</span></p>
            </div>
            <p className='detailsCard-p'>Location: <span className='detailsCard-span' id='contractor-location'>{userDetails.location}</span></p>
            <p className='detailsCard-p'>Payment: $ <span className='detailsCard-span' id='contractor-totalPayment'>{userDetails.amount}</span></p>
            <button className="btn btn-primary btn-sm admin-bookings-labour-allocate-btn" onClick={handleAllocation}>Allocate Workforce</button>
          </div>
        </div>
      </div>

    </div>
  );
};


export default AdminBookings;




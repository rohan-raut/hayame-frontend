import "./contractorBooking.css"
import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
// import Highlighter from 'react-highlight-words';
import Popup from "reactjs-popup";
import { MDBDataTable } from 'mdbreact';

const ContractorBooking = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const handleDetailsAction = (e) => {
    console.log(e.target.parentElement.parentElement.parentElement.parentElement.cells[0].innerText)

    fetch("http://45.127.4.151:8000/api/booking?booking_id=" + e.target.parentElement.parentElement.parentElement.parentElement.cells[0].innerText, {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
        'Content-Type': 'application/json'

      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        document.getElementById('contractor-contractorName').innerText = json[0]['contractor_name']
        document.getElementById('contractor-contractorEmail').innerText = json[0]['contractor_email']
        document.getElementById('contractor-labourType').innerText = json[0]['labour_skill']
        document.getElementById('contractor-labourCount').innerText = json[0]['labour_count']
        document.getElementById('contractor-Status').innerText = json[0]['status']
        document.getElementById('contractor-startDate').innerText = json[0]['start_date']
        document.getElementById('contractor-endDate').innerText = json[0]['end_date']
        document.getElementById('contractor-startTime').innerText = json[0]['start_time']
        document.getElementById('contractor-endTime').innerText = json[0]['end_time']
        document.getElementById('contractor-location').innerText = json[0]['location']
        document.getElementById('contractor-totalPayment').innerText = json[0]['amount']

      })

  }

  const [tableData, setTableData] = useState([])
  const data = {
    columns: [
      {
        label: "Booking ID",
        field: "bookingID"
      },
      {
        label: "Address",
        field: "address"
      },
      {
        label: "startDate",
        field: "startDate"
      },
      {
        label: "Skills",
        field: "skills"
      },
      {
        label: "Job Status",
        field: "jobStatus"
      },
      {
        label: "Action",
        field: "action"
      }
    ],
    rows: tableData
  }


  useEffect(() => {

    let d = []

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/booking?contractor_email=' + JSON.parse(localStorage.getItem("email")), {
        headers: {
          'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
          'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for (let i = 0; i < td.length; i++) {
        d.push({
          "bookingID": td[i]['booking_id'],
          "address": td[i]['location'],
          "startDate": td[i]['start_date'],
          "skills": td[i]['labour_skill'],
          "jobStatus": td[i]['status'],
          "action": <span style={{ textDecoration: "underline", cursor: "pointer" }} ><Popup trigger={<span ><span onClick={handleDetailsAction}>Details</span></span>} ><DetailsCard /></Popup></span>,
        });
      }
      setTableData(d);
    }

    fillTable();
  }, [])



  return (
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
    </div>
  )
}


const DetailsCard = () => {

  const handleCross = () => {
    document.getElementById("detailsCard").style.display = "none"
  }


  return (
    // <div className='detailsCard' id="detailsCard">
    //   <span className='detailsCard-cross' style={{ cursor: "pointer" }} onClick={handleCross} >X</span>
    //   <p className='detailsCard-p' id='contractor-contractorName'>Avlin Jenner</p>
    //   <p className='detailsCard-p' id='contractor-contractorEmail'>avlinjenner@gmail.com</p>
    //   <p className='detailsCard-p' >Workforce Type: <span className='detailsCard-span' id='contractor-labourType'>Catering</span></p>
    //   <p className='detailsCard-p' >Count: <span className='detailsCard-span' id='contractor-labourCount'>30</span></p>
    //   <p className='detailsCard-p' >Status: <span className='detailsCard-span' id='contractor-Status'>Pending</span></p>
    //   <div style={{ display: "flex", marginTop: "0" }}>
    //     <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Date: <span className='detailsCard-span' id='contractor-startDate'>20/05/23</span></p>
    //     <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Date: <span className='detailsCard-span' id='contractor-endDate'>28/06/23</span></p>
    //   </div>
    //   <div style={{ display: "flex", marginTop: "0" }}>
    //     <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Time: <span className='detailsCard-span' id='contractor-startTime'>9:00</span></p>
    //     <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Time: <span className='detailsCard-span' id='contractor-endTime'>18:00</span></p>
    //   </div>
    //   <p className='detailsCard-p' style={{ marginTop: "0" }}>Location: <span className='detailsCard-span' id='contractor-location'>New Jersey</span></p>
    //   <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>Payment: $ <span className='detailsCard-span' id='contractor-totalPayment'>100</span></p>
    // </div>

    <div className="row justify-content-center">
      <div className="col-11 col-sm-11 col-md-10 col-lg-8 contractor-booking-details-card">
        <div className="d-flex flex-row-reverse">
          <span className='detailsCard-cross' style={{ cursor: "pointer" }} onClick={handleCross} >X</span>
        </div>
        <p className='detailsCard-p' id='contractor-contractorName'>Avlin Jenner</p>
       <p className='detailsCard-p' id='contractor-contractorEmail'>avlinjenner@gmail.com</p>
       <p className='detailsCard-p' >Workforce Type: <span className='detailsCard-span' id='contractor-labourType'>Catering</span></p>
       <p className='detailsCard-p' >Count: <span className='detailsCard-span' id='contractor-labourCount'>30</span></p>
       <p className='detailsCard-p' >Status: <span className='detailsCard-span' id='contractor-Status'>Pending</span></p>
       <div style={{ display: "flex", marginTop: "0" }}>
         <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Date: <span className='detailsCard-span' id='contractor-startDate'>20/05/23</span></p>
         <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Date: <span className='detailsCard-span' id='contractor-endDate'>28/06/23</span></p>
       </div>
       <div style={{ display: "flex", marginTop: "0" }}>
         <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Time: <span className='detailsCard-span' id='contractor-startTime'>9:00</span></p>
         <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Time: <span className='detailsCard-span' id='contractor-endTime'>18:00</span></p>
       </div>
       <p className='detailsCard-p' style={{ marginTop: "0" }}>Location: <span className='detailsCard-span' id='contractor-location'>New Jersey</span></p>
       <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>Payment: $ <span className='detailsCard-span' id='contractor-totalPayment'>100</span></p>
      </div>
    </div>
  )
}

export default ContractorBooking;

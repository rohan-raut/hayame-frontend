import React, { useRef, useState, useEffect } from 'react';
import "./addWorkforceList.css"
import { useNavigate, Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';


const AddWorkforceList = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  let navigate = useNavigate()

  const handleEditAction = (e) => {
    let labourEmail = e.target.parentElement.parentElement.cells[2].innerText;
    navigate("/dashboard/update-labour-details?email=" + labourEmail)
  }

  const [tableData, setTableData] = useState([])

  const data = {
    columns: [
      {
        label: 'First Name',
        field: 'firstName'
      },
      {
        label: 'Last Name',
        field: 'lastName'
      },
      {
        label: 'Email',
        field: 'email'
      },
      {
        label: 'Skill',
        field: 'skill'
      },
      {
        label: 'Phone',
        field: 'phone'
      },
      {
        label: 'Action',
        field: 'action',
      }
    ],

    rows: tableData
  }


  useEffect(() => {

    let d = []

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/labour-list', {
        headers: {
          'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
          'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for (let i = 0; i < td.length; i++) {
        d.push({
          "firstName": td[i]['first_name'],
          "lastName": td[i]['last_name'],
          "email": td[i]['email'],
          "skill": td[i]['skills'],
          "phone": td[i]['phone'],
          "action": <p style={{ cursor: "pointer", textDecoration: "underline", color: "green" }} onClick={handleEditAction}>Edit</p>
        });
      }
      setTableData(d)
    }

    fillTable()
  }, [])


  return (

    <div className="row justify-content-center m-0">
      <div className="col-10 col-sm-10 col-md-11 col-lg-8 workforcelist-table-card">
      <MDBDataTable className="workforcelist-table"
         responsive
         striped
         small
         bordered
         data={data} />
      </div>
    </div>
  )
}

export default AddWorkforceList
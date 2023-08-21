import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./report.css";
import Select from "react-select";
import { CSVLink } from "react-csv";

const Report = (props) => {
    const [allData, setAllData] = useState([]);
    const [allDataMonth, setAllDataMonth] = useState({});
    const [tableData, setTableData] = useState([]);
    const [selectedLabour, setSelectedLabour] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [labourList, setSelectLabour] = useState([]);
    const [yearOptions, setSelectYear] = useState([]);
    const [monthOptions, setSelectMonth] = useState([
        {
            value: "January",
            label: "January"
        },
        {
            value: "February",
            label: "February"
        },
        {
            value: "March",
            label: "March"
        },
        {
            value: "April",
            label: "April"
        },
        {
            value: "May",
            label: "May"
        },
        {
            value: "June",
            label: "June"
        },
        {
            value: "July",
            label: "July"
        },
        {
            value: "August",
            label: "August"
        },
        {
            value: "September",
            label: "September"
        },
        {
            label: "October",
            value: "October"
        },
        {
            label: "November",
            value: "November"
        },
        {
            label: "December",
            value: "December"
        },
    ]);

    let columns = [
        {
            label: 'Booking ID',
            field: 'booking_id',
        },
        {
            label: 'Labour Email',
            field: 'labour_email',
        },
        {
            label: 'Contractor Name',
            field: 'contractor_name',
        },
        {
            label: 'Skill',
            field: 'skill',
        },
        {
            label: 'Start Date',
            field: 'start_date',
        },
        {
            label: 'End Date',
            field: 'end_date',
        },
        {
            label: 'Hours',
            field: 'hours',
        },
        {
            label: 'Amount',
            field: 'amount',
        }
    ]


    useEffect(() => {

        const getReportData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/report', {
                headers: {
                    'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                    'Content-Type': 'application/json'
                }
            })
            const td = await response.json()
            let keys = Object.keys(td);
            let allDataTemp = [];
            for (let i = 0; i < keys.length; i++) {
                let allDataMonthTemp = []
                for (let j = 0; j < td[keys[i]].length; j++) {
                    allDataMonthTemp.push({
                        "booking_id": td[keys[i]][j].booking_id,
                        "labour_email": td[keys[i]][j].labour_email,
                        "contractor_name": td[keys[i]][j].contractor_name,
                        "skill": td[keys[i]][j].labour_skill,
                        "start_date": td[keys[i]][j].start_date,
                        "end_date": td[keys[i]][j].end_date,
                        "hours": td[keys[i]][j].hours,
                        "amount": td[keys[i]][j].amount
                    })
                    allDataTemp.push({
                        "booking_id": td[keys[i]][j].booking_id,
                        "labour_email": td[keys[i]][j].labour_email,
                        "contractor_name": td[keys[i]][j].contractor_name,
                        "skill": td[keys[i]][j].labour_skill,
                        "start_date": td[keys[i]][j].start_date,
                        "end_date": td[keys[i]][j].end_date,
                        "hours": td[keys[i]][j].hours,
                        "amount": td[keys[i]][j].amount
                    });
                }
                setAllDataMonth(values => ({ ...values, [keys[i]]: allDataMonthTemp }));
            }
            setAllData(allDataTemp);
            setTableData(allDataTemp);

            let labourListTemp = [];
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
                        labourListTemp.push({
                            value: json[i]["email"],
                            label: json[i]["email"]
                        })
                    }
                    setSelectLabour(labourListTemp);
                });

        }

        let temp = [];
        for (let i = 2023; i < 2030; i++) {
            temp.push({
                value: i,
                label: i
            })
        }
        setSelectYear(temp);

        getReportData();


    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        let key = selectedMonth.value + " " + selectedYear.value;
        let temp = [];
        if (allDataMonth[key] !== undefined) {
            for (let i = 0; i < allDataMonth[key].length; i++) {
                if (allDataMonth[key][i]["labour_email"] === selectedLabour.value) {
                    temp.push(allDataMonth[key][i]);
                }
            }
        }
        setTableData(temp);
    }



    return (
        <div className='row justify-content-center m-0'>
            <div className="col-11 col-sm-11 col-md-12 col-lg-9 report-card">
                <form onSubmit={handleSubmit}>
                    <div className="row align-items-center">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 py-3">
                            <label htmlFor="labourList" className="form-label report-label">Labour Email</label>
                            <Select
                                onChange={setSelectedLabour}
                                options={labourList}
                                className="form-control p-0"
                                required
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 py-3">
                            <label htmlFor="month" className="form-label report-label">Month</label>
                            <Select
                                onChange={setSelectedMonth}
                                options={monthOptions}
                                className="form-control p-0"
                                required
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 py-3">
                            <label htmlFor="year" className="form-label report-label">Year</label>
                            <Select
                                onChange={setSelectedYear}
                                options={yearOptions}
                                className="form-control p-0"
                                required
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 py-3">
                            <button type='submit' className="btn btn-primary btn-sm">Apply</button>
                        </div>
                    </div>
                </form>
                <MDBTable fixed bordered responsive>
                    <MDBTableHead columns={columns} />
                    <MDBTableBody rows={tableData} />
                </MDBTable>

                <CSVLink className="btn btn-sm btn-primary downloadbtn" filename="hayame-report.csv" data={tableData}>
                    Export to CSV
                </CSVLink>
            </div>
        </div>

    );
};

export default Report;
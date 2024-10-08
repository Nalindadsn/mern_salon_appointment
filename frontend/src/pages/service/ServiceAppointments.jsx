import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import axios from "axios";

import { message, Table } from "antd";
import moment from "moment";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

import jsPDF from 'jspdf'
import 'jspdf-autotable'
const ServiceAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/service/service-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/service/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },


    {
      title: "Service Name",
      dataIndex: "user",
      render: (text, record) => (
        <span>
          
          {record?.service[0]?.name}<br/>
          {record?.service[0]?._id}
          {/* {JSON.stringify(record)} */}
        </span>
      ),
    },
   
    {
      title: "user",
      dataIndex: "user",
      render: (text, record) => (
        <span>
          
          {record?.users[0]?.name}<br/>
          {record?.users[0]?._id}
          {/* {JSON.stringify(record)} */}
        </span>
      ),
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="m-1 btn btn-success "
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="m-1 btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  const data = appointments 

  const handleGenerate = () =>{
    const doc = new jsPDF()
    const title = "Message List"
    const padding = 10
    const titleWidth = doc.getTextWidth(title)
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
    doc.setTextColor('#333')
    doc.text(title,center,padding)

    doc.autoTable({
        head:[['Id','first Name',"Last Name","Phone","Email","Message","Joined Date"]],
        body: data.map((val,i)=>[i+1,val.firstName,val.lastName,val.phone,val.email,val.message,moment(val.createdAt).format("YYYY-MM-DD")]),
        columnStyles:{
            0:{cellWidth:10},
            1:{cellWidth:25},
            2:{cellWidth:25},
            3:{cellWidth:23},
            4:{cellWidth:35},
            5:{cellWidth:45},
            6:{cellWidth:25},
        },
        headStyles:{
            fillColor: "#333",
            textColor: "white"
        }
    })

    doc.save('appointments.pdf')
  }
  return (
    <LayoutWithSidebar>
      <h3>Appointments Lists</h3>
      {JSON.stringify(appointments)}
      <button onClick={handleGenerate}>Generate PDF</button> 

      <Table columns={columns} dataSource={appointments} />
    </LayoutWithSidebar>
  );
};

export default ServiceAppointments;
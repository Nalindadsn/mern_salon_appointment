import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import axios from "axios";

import { Input, message, Table } from "antd";
import moment from "moment";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { render } from "react-dom";
const { Search } = Input;

const ServiceAppointments = () => {
  const [searchValue, setSearchValue] = useState("");
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
      render: (text, record) => <span>{record._id.slice(-5)}</span>,
    },

    {
      title: "Service Name",
      dataIndex: "user",
      render: (text, record) => (
        <span>
          {record?.service[0]?.name}
          <br />
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
          {record?.users[0]?.name}
          <br />
          {record?.users[0]?._id}
          {/* {JSON.stringify(record)} */}
        </span>
      ),
    },
    {
      title: "fee",
      dataIndex: "fee",
      render: (text, record) => (
        <span>
          {record?.fee}
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
  const data = appointments;

  const handleGenerate = () => {
    const doc = new jsPDF();
    const title = "Appoinments List";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;
    doc.setTextColor("#333");
    doc.text(title, center, padding);

    doc.autoTable({
      head: [
        [
          "Id",
          "name",
          "Service",
          "Appointment date",
          "Fee",
          "Time",
          "created Date",
        ],
      ],
      body: data.map((val, i) => [
        i + 1,
        val.users[0].name,
        val.service[0].name,
        moment(val.date).format("YYYY-MM-DD"),
        val.fee,
        moment(val.time).format("HH:mm"),
        moment(val.createdAt).format("YYYY-MM-DD"),
      ]),
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 45 },
        2: { cellWidth: 55 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
      },
      headStyles: {
        fillColor: "#333",
        textColor: "white",
      },
    });

    doc.save("appointments.pdf");
  };

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filtereAppointment = appointments.filter((service) => {
    const _id = `${service._id}`.toLowerCase();
    return _id.includes(searchValue);
  });

  return (
    <LayoutWithSidebar>
      <h3>Appointments Lists</h3>
      {/* {JSON.stringify(appointments)} */}
      <div className="d-flex">
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          enterButton
          style={{ marginRight: 10 }}
        />
        <button onClick={handleGenerate} style={{ width: "200px" }}>
          Generate PDF
        </button>
      </div>

      <Table columns={columns} dataSource={filtereAppointment} />
    </LayoutWithSidebar>
  );
};

export default ServiceAppointments;

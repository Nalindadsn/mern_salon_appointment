import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
const { Search } = Input;

const Service = () => {
  const [services, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getService = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/getAllServices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setService(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch services.");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/admin/changeServiceStatus",
        { serviceId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getService();
      } else {
        message.error(res.data.message || "Failed to update account status.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredServices = services.filter((service) => {
    const fullName = `${service.name} ${service.lastName}`.toLowerCase();
    return fullName.includes(searchValue);
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.name} {record.lastName}
        </span>
      ),
      // responsive: ["xs"]
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Fee LKR",
      dataIndex: "feesPerConsultation",
    },
    {
      title: "Start time",
      dataIndex: "starttime",
    },
    {
      title: "End time",
      dataIndex: "endtime",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Button
            className="m-1"
            type="primary"
            onClick={() => handleAccountStatus(record, "published")}
            disabled={record.status === "published"}
          >
            Publish
          </Button>
          <Button
            className="m-1"
            type="danger"
            onClick={() => handleAccountStatus(record, "rejected")}
            disabled={record.status === "rejected"}
          >
            Reject
          </Button>
          <Button
            className="m-1"
            onClick={() => {
              setSelectedService(record);
              setModalVisible(true);
            }}
          >
            View Details
          </Button>
          <Button
            className="m-1"
            // onClick={() => {
            //   setSelectedProduct(record);
            //   setModalVisible(true);
            // }}
          >
            {" "}
            <Link to={`/admin/services/${record._id}`}>Edit</Link>{" "}
          </Button>
        </div>
      ),
    },
  ];

  const data = services;

  const handleGenerate = () => {
    const doc = new jsPDF();
    const title = "Service";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;
    doc.setTextColor("#333");
    doc.text(title, center, padding);

    doc.autoTable({
      head: [
        [
          "Id",
          "Name",
          "Description",
          "Fee LKR",
          "Start Time",
          "End Time",
          "Created Date",
        ],
      ],
      body: data.map((val, i) => [
        i + 1,
        val.name,
        val.description,
        val.feesPerConsultation,
        val.starttime,
        val.endtime,
        moment(val.createdAt).format("YYYY-MM-DD"),
      ]),
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 35 },
      },
      headStyles: {
        fillColor: "#333",
        textColor: "white",
      },
    });

    doc.save("services.pdf");
  };
  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-3">All Service</h3>
        <Link to="/admin/add-service">Add Service</Link>
        <div className="d-flex align-items-center mb-2">
          <Search
            placeholder="Search by name"
            onSearch={handleSearch}
            enterButton
            style={{ marginRight: 10 }}
          />
          <Button onClick={handleClearSearch}>Clear</Button>
          <button onClick={handleGenerate} style={{ width: "150px" }}>
            Generate PDF
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Table columns={columns} dataSource={filteredServices} />
      )}
      <Modal
        title="Service Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedService && (
          <div>
            <p>Name: {`${selectedService.name} `}</p>
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%" }}
            />
            <p>Description: {selectedService.description}</p>

            <p>Status: {selectedService.status}</p>
            <p>Service ID: {selectedService.userId}</p>
            <p>
              Created Date:{" "}
              {new Date(selectedService.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </LayoutWithSidebar>
  );
};

export default Service;

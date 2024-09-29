import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

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
        "/api/admin/changeAccountStatus",
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
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Button
            className="m-1"
            type="primary"
            onClick={() => handleAccountStatus(record, "approved")}
            disabled={record.status === "approved"}
          >
            Approve
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
        </div>
      ),
    },
  ];

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
            <p>
              Name: {`${selectedService.name} `}
            </p>
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

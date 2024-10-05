import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

const { Search } = Input;

const Message = () => {
  const [products, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/getAllContact", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setMessage(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredMessages = products.filter((product) => {
    const fullName = `${product.name} ${product.lastName}`.toLowerCase();
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
      title: "Brand",
      dataIndex: "brand",
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
              setSelectedMessage(record);
              setModalVisible(true);
            }}
          >
            View Details
          </Button>
          <Button
            className="m-1"
            // onClick={() => {
            //   setSelectedMessage(record);
            //   setModalVisible(true);
            // }}
          >
            Edit          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-3">All Messages</h3>
        <Link to="/admin/add-product">Add Message</Link>
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
        
        <Table columns={columns} dataSource={filteredMessages} />
      )}
      <Modal
        title="Message Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedMessage && (
          <div>
            <p>
              Name: {`${selectedMessage.name} `}
            </p>
            <img src={selectedMessage.image} alt="Message" style={{ width: "100%"}}/>
            <p>Brand: {selectedMessage.brand}</p>
            <p>Description: {selectedMessage.description}</p>

            <p>Status: {selectedMessage.status}</p>
            <p>Message ID: {selectedMessage.userId}</p>
            <p>
              Created Date:{" "}
              {new Date(selectedMessage.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </LayoutWithSidebar>
  );
};

export default Message;

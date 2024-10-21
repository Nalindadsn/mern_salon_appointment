import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Input, Modal } from "antd";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { Button } from "react-bootstrap";
const { Search } = Input;

const Coupon = () => {
  const [userInfo, setUser] = useState(null);

  const params = useParams();
  //getDOc Details
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/admin/getUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    //eslint-disable-next-line
  }, []);

  const [messages, setCoupon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getCoupon = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/getAllCoupons", {
        userId: params?.id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCoupon(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch messages.");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoupon();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredCoupons = messages?.filter((product) => {
    const fullName = `${product.code} ${product.amount}`.toLowerCase();
    return fullName.includes(searchValue);
  });
  const handleDelete = async (record, status) => {
    if (confirm("Are you sure you want to DELETE?")) {
      // alert('Deleted')
      try {
        const res = await axios.delete("/api/admin/deleteMessage", {
          data: {
            userId: params?.id,
            messageId: record._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // if (res.data.success) {
        window.location.reload();
        getCoupon();
        // } else {
        //   message.error(res.data.message || "Failed to delete message.");
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "code",
      dataIndex: "code",
      render: (text, record) => (
        <span>
          {record.code} {record.amount}
        </span>
      ),
      // responsive: ["xs"]
    },
    {
      title: "amount",
      dataIndex: "amount",
    },
    {
      title: "expireDate",
      dataIndex: "expireDate",
      render: (text, record) => (
        <span>{moment(record.expireDate).format("YYYY/MM/DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      render: (text, record) => (
        <span style={{ color: record.isActive == "active" ? "green" : "red" }}>
          {record.isActive}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => (
        <div className="">
          Created : {moment(record?.createdAt).format("YYYY/MM/DD HH:mm:ss")}
          <br />
          {record?.createdAt == record?.updatedAt ? (
            ""
          ) : (
            <span>
              Edited : {moment(record?.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex ">
          <Link
            to={`/admin/messages/${record._id}`}
            className="btn btn-primary"
          >
            Edit
          </Link>
          <Button
            className="ml-2"
            variant="danger"
            onClick={() => handleDelete(record, "deleted")}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const data = messages;

  const handleGenerate = () => {
    const doc = new jsPDF();
    const title = "Coupon List";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;
    doc.setTextColor("#333");
    doc.text(title, center, padding);

    doc.autoTable({
      head: [
        ["Id", "Code", "Amount", "isActive", "Expire Date", "Joined Date"],
      ],
      body: data.map((val, i) => [
        i + 1,
        val.code,
        val.amount,
        val.isActice,
        moment(val.expireDate).format("YYYY-MM-DD HH:mm:ss"),
        moment(val.createdAt).format("YYYY-MM-DD"),
      ]),
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 23 },
        4: { cellWidth: 35 },
        5: { cellWidth: 45 },
        6: { cellWidth: 25 },
      },
      headStyles: {
        fillColor: "#333",
        textColor: "white",
      },
    });

    doc.save("messages.pdf");
  };

  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-3">All Coupons</h3>
        <Link to="/admin/coupons/new" className="btn btn-primary">
          Add Coupon
        </Link>
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
        <Table columns={columns} dataSource={filteredCoupons} />
      )}
    </LayoutWithSidebar>
  );
};

export default Coupon;

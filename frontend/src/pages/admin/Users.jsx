import { Table, Modal, Button, message, Input, Tooltip, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import moment from "moment";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const { Search } = Input;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [blockUserId, setBlockUserId] = useState(null);
  const [isBlockingModalVisible, setIsBlockingModalVisible] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleBlockUser = (userId) => {
    setBlockUserId(userId);
    setIsBlockingModalVisible(true);
  };

  const handleConfirmBlockUser = async () => {
    try {
      // Perform blocking action here
      setIsBlockingModalVisible(false);
      message.success("User blocked successfully.");
      // Refetch users after blocking
      getUsers();
    } catch (error) {
      console.log(error);
      message.error("Failed to block user.");
    }
  };

  const handleCancelBlockUser = () => {
    setBlockUserId(null);
    setIsBlockingModalVisible(false);
  };

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (text, record) => <Badge className={`text-white ${record.isAdmin ? "bg-success" : "bg-primary"}`}>{record.isAdmin ? "Admin" : "User"}</Badge>,
    },
    {
      title: "Date Joined",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>{moment(record.createdAt).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Space>
        <Tooltip title="Block User">
          <Button
            className="m-1"
            type="danger"
            onClick={() => handleBlockUser(record.userId)}
          >
            Block
          </Button>
        </Tooltip>
          <Tooltip title="Block User">
            <Link to={`/admin/users/${record._id}`}
            >
              Edit
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];



  const data = users

  const handleGenerate = () =>{
    const doc = new jsPDF()
    const title = "User List"
    const padding = 10
    const titleWidth = doc.getTextWidth(title)
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
    doc.setTextColor('#333')
    doc.text(title,center,padding)

    doc.autoTable({
        head:[['Id','Name',"isAdmin","Joined Date"]],
        body: data.map((val,i)=>[i+1,val.name,val.isAdmin?"Admin":"User",moment(val.createdAt).format("YYYY-MM-DD")]),
        columnStyles:{
            0:{cellWidth:10},
            1:{cellWidth:100},
            2:{cellWidth:35},
            3:{cellWidth:35},
        },
        headStyles:{
            fillColor: "#333",
            textColor: "white"
        }
    })

    doc.save('users.pdf')
  }

  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-2">Users List</h3>

        {/* {JSON.stringify(users)} */}


        <Space>
          <Search
            placeholder="Search by name or email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            enterButton
          />
          <Button onClick={handleClearSearch}>Clear</Button>
          <button onClick={handleGenerate}>Generate PDF</button> 
        </Space>
      </div>
      <div style={{overflowX: "auto"}}>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        loading={loading}
        rowKey="userId"
        pagination={{ pageSize: 10 }}
        scroll={{ y: 400 }}
      />
</div>
      <Modal
        title="Confirm Block User"
        visible={isBlockingModalVisible}
        onOk={handleConfirmBlockUser}
        onCancel={handleCancelBlockUser}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to block this user?</p>
      </Modal>
    </LayoutWithSidebar>
  );
};

export default Users;

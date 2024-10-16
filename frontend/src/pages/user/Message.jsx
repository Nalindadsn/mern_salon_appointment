import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from "moment";
const { Search } = Input;

const UserMessage = () => {
  const [messages, setUserMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUserMessage, setSelectedUserMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getUserMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/getAllUserMessages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUserMessage(res.data.data);
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
    getUserMessage();
  }, []);

  

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredUserMessages = messages.filter((product) => {
    const fullName = `${product.firstName} ${product.lastName}`.toLowerCase();
    return fullName.includes(searchValue);
  });

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName} 
        </span>
      ),
      // responsive: ["xs"]
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "UserMessage",
      dataIndex: "message",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Link
            className="m-1"
            // onClick={() => handleAccountStatus(record, "published")}
            // disabled={record.status === "published"}
            to={`https://api.whatsapp.com/send?phone=${record?.phone}&text=Hello`}
            target="_blank"
          >
            Chat
          </Link>
          {/* <Button
            className="m-1"
            type="danger"
            onClick={() => handleAccountStatus(record, "rejected")}
            disabled={record.status === "rejected"}
          >
            Reject
          </Button> */}
         
          
        </div>
      ),
    },
  ];

  const data = messages

  const handleGenerate = () =>{
    const doc = new jsPDF()
    const title = "UserMessage List"
    const padding = 10
    const titleWidth = doc.getTextWidth(title)
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
    doc.setTextColor('#333')
    doc.text(title,center,padding)

    doc.autoTable({
        head:[['Id','first Name',"Last Name","Phone","Email","UserMessage","Joined Date"]],
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

    doc.save('messages.pdf')
  }




  const [userInfo, setUser] = useState(null);

  const params = useParams();
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/user/getUserInfo",
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



  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-3">All UserMessages</h3>
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
        
        <Table columns={columns} dataSource={filteredUserMessages} />
      )}
     
    </LayoutWithSidebar>
  );
};

export default UserMessage;

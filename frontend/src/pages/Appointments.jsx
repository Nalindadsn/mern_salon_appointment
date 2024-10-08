import { Table, Spin, Empty } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LayoutWithSidebar from "../components/LayoutwithSidebar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  // const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const getAppointments = async () => {
    try {
      setLoading(true);
      const [appointmentsRes] = await Promise.all([
        axios.get("/api/user/user-appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        // axios.post(
        //   "/api/user/getUserData",
        //   {},
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // ),
      ]);

      if (appointmentsRes.data.success) {
        setAppointments(appointmentsRes.data.data);
      }

      // if (userDataRes.data.success) {
      //   setUserData(userDataRes.data.data);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Appointment ID",
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
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
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
      title: "status",
      dataIndex: "status",
      render: (text, record) => (
        <span className={`${record?.status=="approved"?"bg-primary":"bg-warning"} rounded-pill px-2 text-white pb-1`}>
          
          {record?.status}{/* {JSON.stringify(record)} */}
        </span>
      ),
    },
  ];
  const data = messages

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

    doc.save('messages.pdf')
  }
  return (
    <LayoutWithSidebar>
      <h3 align="center">Appointments Lists</h3>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div style={{overflowX: "auto"}}>
          {/* <div>Email: {userData.email}</div> */}
          {appointments.length > 0 ? (
            <Table columns={columns} dataSource={appointments} />
          ) : (
            <Empty description="No appointments found" />
          )}
        </div>
      )}
    </LayoutWithSidebar>
  );
};

export default Appointments;

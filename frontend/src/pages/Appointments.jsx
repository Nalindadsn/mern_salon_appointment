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



import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Empty, Input, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ServiceList from "../../components/ServiceList";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";
import { FaBookmark, FaCalendar, FaCalendarAlt, FaList, FaUsers } from "react-icons/fa";
// import {moment}

const { Search } = Input;
const { Title, Text } = Typography;
const AdminDashboard = () => {
  const [data, setAdminDashboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/getSummary", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setAdminDashboard(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value?.trim().toLowerCase());
  };

  return (
    <>
      <LayoutWithSidebar>
        <h2>DASHBOARD </h2>
        <div className="row">
          <div className="col-md-3">
            <div className="m-2 border p-2 rounded">
              <div style={{ padding: "5px" }}>
                <div className="d-flex justify-content-between mb-2 mt-2">
                  <span>Appontments
                  </span>
                  <span className="text-right w-full bg-dark">                
                  <span className="bg-primary text-white rounded p-2 text-center"> <FaCalendarAlt /></span>

                  </span>
                </div>
                
               

                
              </div>
              <div className="text-muted text-center">
                <b>Pending</b> :{" "}
                {data?.pendingAppointments &&
                  data?.pendingAppointments.length}{" "}
                | <b>Approved</b> :{" "}
                {data?.approvedAppointments &&
                  data?.approvedAppointments.length}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="m-2 border p-2 rounded">
              <div style={{ padding: "5px" }}>
                 

                <div className="d-flex justify-content-between mb-2 mt-2">
                  <span>Users
                  </span>
                  <span className="text-right w-full bg-dark">                
                  <span className="bg-primary text-white rounded p-2 text-center"> <FaUsers /></span>

                  </span>
                </div>

                
                
              </div>
              <div className="text-muted text-center">
                <b>Admins</b> : {data?.admin && data?.admin.length} |{" "}
                <b>Users</b> : {data?.users && data?.users.length}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="m-2 border p-2 rounded">
              <div style={{ padding: "5px" }}>
              <div className="d-flex justify-content-between mb-2 mt-2">
                  <span>Services
                  </span>
                  <span className="text-right w-full bg-dark">                
                  <span className="bg-primary text-white rounded p-2 text-center"> <FaBookmark /></span>

                  </span>
                </div>
              </div>
              <div className="text-muted text-center">
                <b>Pending</b> : {data?.pendingServices && data?.pendingServices.length} | <b>Aproved</b>{" "}
                : {data?.approvedServices && data?.approvedServices.length}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="m-2 border p-2 rounded">
              <div style={{ padding: "5px" }}>
              <div className="d-flex justify-content-between mb-2 mt-2">
                  <span>Products
                  </span>
                  <span className="text-right w-full bg-dark">                
                  <span className="bg-primary text-white rounded p-2 text-center"> <FaList /></span>

                  </span>
                </div>
              </div>
              <div className="text-muted text-center">
                <b>Pending</b> : {data?.pendingProducts && data?.pendingProducts.length} | <b>Aproved</b>{" "}
                : {data?.approvedProducts && data?.approvedProducts.length}
              </div>
            </div>
          </div>

        </div>
        {/* {JSON.stringify(data?.pendingAppointments.length)} */}
        <h3 className="mt-4">Latest Pending Appointments</h3>
        <ul class="list-group">
          {data?.pendingAppointments &&
                  data?.pendingAppointments.length>0? data?.pendingAppointments.map((appointment) => (
                    <li class="list-group-item mb-2" key={appointment?._id}>
                      #id :{appointment?._id} <br/>
                      ServiceId: {appointment?.serviceId}<br/>
                      userId:{appointment?.userId}<br/>
                      Date:{appointment?.createdAt} <br/>
                      Time:{appointment?.time}<br/>
                      {JSON.stringify(appointment)}

                      </li>
                  )):"No Pending Appointments"}
</ul>

      </LayoutWithSidebar>
    </>
  );
};

export default AdminDashboard;

import React from "react";
import { Badge, Button, message } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import Footer from "../_components/Footer";
import Header from "./Header";
import { FaBell } from "react-icons/fa";

const Layout = ({ children }) => {
  const  {user} = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully");
    navigate("/login");
  };

  // Sidebar menu based on user role
  const sidebarMenu = user?.isAdmin
    ? adminMenu.filter((menu) => menu.name !== "Profile")
    : user?.isService
    ? [
        { name: "Home", path: "/" },
        { name: "Appointments", path: "/service-appointments" },
        { name: "Profile", path: `/service/profile/${user?._id}` },
      ]
    : userMenu.filter((menu) => menu.name !== "Profile");

  return (
    <div className="main" style={{overflow:"hidden"}}>
      <Header notification={user?.notification ? user.notification.length : 0}/>
      <div>

        <div className="">
         
          <div style={{minHeight:"100vh"}}>{children}</div>
         
         <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Layout;

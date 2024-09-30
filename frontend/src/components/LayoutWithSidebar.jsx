import React from "react";
import { Badge, Button, message } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import Footer from "../_components/Footer";
import HeaderAdmin from "./HeaderAdmin";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FaCopyright } from "react-icons/fa";
const LayoutWithSidebar = ({ children }) => {
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
    <div className="main">

<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
           <Link to={`/`} style={{color:"white",textDecoration:"none"}}>SALON OLIVIA</Link> 
         
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>


          {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                
            <NavLink exact to={menu.path} activeClassName="activeClicked"  key={menu.name}>
              <CDBSidebarMenuItem icon={menu.icon}>{menu.name}</CDBSidebarMenuItem>
            </NavLink>
                {/* <div
                  key={menu.name}
                  className={`menu-item ${isActive && "active"}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div> */}

</>
              );
            })}


          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
           <FaCopyright/> 2024
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div style={{width:"100%",overflow:"auto"}}>
      <HeaderAdmin/>
<div className="p-3"> {children}</div>
       
        </div>
    </div>
{/* 
      <div className="layout">
        <div className="sidebar" style={{width:"300px"}}>
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.name}
                  className={`menu-item ${isActive && "active"}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2">
         
          <div className="body">{children}</div>
         
        </div>
      </div> */}
    </div>
  );
};

export default LayoutWithSidebar;

import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = () => {
  const location = useLocation();

  const hideOnPages = {
    "/about": ["About Us"],
    "/products": ["Products"],
    "/services": ["Services"],
    "/contact": ["Contact Us"],
    "/login": ["Sign In"],
  };

  const navLinks = [
    { title: "About Us", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Products", path: "/products" },
    { title: "Contact Us", path: "/contact" },
    { title: "Sign In", path: "/login" },
  ];

  const visibleLinks = navLinks.filter((link) => {
    const page = hideOnPages[location.pathname];
    return !page || !page.includes(link.title);
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#560C34" }}
    >
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          alt="logo"
          style={{ height: "100px", marginInlineStart: "20px" }}
        />
      </a>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {visibleLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a
                href={link.path}
                className="nav-link"
                style={{
                  backgroundColor: "#C07BA0",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  marginRight: "20px",
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MyNavbar;

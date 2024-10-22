import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/Footer.module.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 logo-and-desc">
            <img
              src={logo}
              alt="logo"
              className="mb-3"
              style={{ width: "100px" }}
            />
            <p>
              SALON OLIVIA offers a beauty oasis with the singular goal of
              pampering you. Our salon services will restore, revive, and
              replenish you with a unique menu of international treatments in a
              luxurious setting.
            </p>
          </div>
          <div className="col-md-3 quick-links">
            <h4>QUICK LINKS</h4>
            <ul className="list-unstyled">
              <li>Hair and Beauty</li>
              <li>Bridal Dressing</li>
              <li>Manicure/Pedicure</li>
              <li>Facials</li>
            </ul>
          </div>
          <div className="col-md-3 contact-details">
            <h4>CONTACT DETAILS</h4>
            <ul className="list-unstyled">
              <li>31/j, Matale Road, Galewela, Dambulla</li>
              <li>SalonOlivia21200@gmail.com</li>
              <li>+94 773091720</li>
            </ul>
          </div>
          <div className="col-md-3 find-us">
            <h4>FIND US</h4>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

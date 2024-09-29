// AppointmentForm.jsx

import React, { useState } from "react";
import "../_styles/Login.module.css"; // Import the CSS file for additional styling
import Footer from "../_components/Footer";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (!phone.trim()) {
      setError("Phone number cannot be empty.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Invalid phone number. It should be exactly 10 digits.");
      return;
    }

    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setError("");
    console.log("Appointment Details:", { name, phone, message });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="appointment-form-container"
          style={{
            backgroundColor: "#AEAEAD",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="text-center mb-4">Make an Appointment</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#CB1276",
                borderColor: "#CB1276",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#a91062")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#CB1276")}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentForm;

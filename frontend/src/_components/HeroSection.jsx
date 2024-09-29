import React from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../_assets/bg.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div
      className="position-relative text-center bg-dark"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-image"
        style={{
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="position-absolute top-5 start-5 text-white display-1 fw-bold ms-5"
          style={{ zIndex: 1 }}
        >
          SALON
          <br />
          OLIVIA
        </h1>
      </div>

      <button
        className="btn"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          backgroundColor: "#CB1276",
          borderColor: "#CB1276",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#a91062")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#CB1276")}
        onClick={handleAppointmentClick}
      >
        Make an appointment
      </button>
    </div>
  );
};

export default HeroSection;

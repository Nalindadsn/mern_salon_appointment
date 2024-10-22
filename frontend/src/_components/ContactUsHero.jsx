import React from "react";
import backgroundImage from "../assets/contactus.png";

const ContactUsHero = () => {
  return (
    <div
      className="position-relative text-center bg-dark"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className="bg-image d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="text-overlay"
          style={{
            color: "#560C34",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            "@media (max-width: 768px)": {
              fontSize: "2rem",
            },
          }}
        >
          Get in touch with us
        </div>

        <div
          className="subtext-overlay mt-3"
          style={{
            color: "#560C34",
            fontSize: "2rem",
            fontWeight: "bold",
            maxWidth: "1200px",
            WebkitTextStroke: "0.5px #c7b6a8",
            textAlign: "center",
            "@media (max-width: 768px)": {
              fontSize: "1.2rem",
            },
          }}
        >
          Welcome to our Salon Olivia, your premier destination for the latest
          skincare and beauty products.
          <br />
          Discover top-notch skincare products, makeup, hair care, and more.
        </div>
      </div>
    </div>
  );
};

export default ContactUsHero;

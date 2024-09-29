import React from "react";
import { useNavigate } from "react-router-dom";

//importing images
import facials from "../_assets/11.png";
import peels from "../_assets/12.png";
import addons from "../_assets/13.png";
import Haircuts from "../_assets/14.png";
import Coloring from "../_assets/15.png";
import Treatments from "../_assets/16.png";
import Manicures from "../_assets/17.png";
import Pedicures from "../_assets/18.png";
import Nail_Enhancements from "../_assets/19.png";
import Massages from "../_assets/20.png";
import Waxing from "../_assets/21.png";
import Body_Scrubs from "../_assets/22.png";

// Reusable ServiceColumn Component
const ServiceColumn = ({ title, imgSrc, altText }) => {
  return (
    <div className="col-md-4 mb-4 p-3">
      <h2>{title}</h2>
      <img
        src={imgSrc}
        alt={altText}
        className="img-fluid"
        style={{
          width: "70%",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

const ServicesContent = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="container position-relative" style={{ zIndex: 2 }}>
      <h1 className="">Services</h1>
      <div className="Welcome text-center mb-5 p-3">
        <h3>Welcome to Salon Olivia</h3>
        <p>
          At Salon Olivia, we offer a wide range of beauty and wellness services
          designed to make you look and feel your best. Our experienced team is
          here to provide you with exceptional care and personalized attention.
        </p>
      </div>

      <h3 className="text-center mb-4">Skin Care</h3>
      <div className="row text-center">
        <ServiceColumn title="Facials" imgSrc={facials} altText="facials" />
        <ServiceColumn
          title="Peels & Exfoliation"
          imgSrc={peels}
          altText="peels"
        />
        <ServiceColumn title="Add-ons" imgSrc={addons} altText="addons" />
      </div>

      <h3 className="text-center mb-4">Hair Care</h3>
      <div className="row text-center">
        <ServiceColumn title="Haircuts" imgSrc={Haircuts} altText="haircuts" />
        <ServiceColumn title="Coloring" imgSrc={Coloring} altText="coloring" />
        <ServiceColumn
          title="Treatments"
          imgSrc={Treatments}
          altText="treatments"
        />
      </div>

      <h3 className="text-center mb-4">Nail Care</h3>
      <div className="row text-center">
        <ServiceColumn
          title="Manicures"
          imgSrc={Manicures}
          altText="manicures"
        />
        <ServiceColumn
          title="Pedicures"
          imgSrc={Pedicures}
          altText="pedicurse"
        />
        <ServiceColumn
          title="Nail Enhancements"
          imgSrc={Nail_Enhancements}
          altText="nail enhancements"
        />
      </div>

      <h3 className="text-center mb-4">Body Treatments</h3>
      <div className="row text-center">
        <ServiceColumn title="Massages" imgSrc={Massages} altText="massage" />
        <ServiceColumn title="Waxing" imgSrc={Waxing} altText="body wraps" />
        <ServiceColumn
          title="Body-Scrubs"
          imgSrc={Body_Scrubs}
          altText="body scrubs"
        />
      </div>

      <div className="d-flex justify-content-center my-5">
        <button
          className="btn btn-primary px-4 py-2"
          style={{
            backgroundColor: "#CB1276",
            borderColor: "#CB1276",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#a91062")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#CB1276")}
          onClick={handleAppointmentClick}
        >
          Make an appointment
        </button>
      </div>
    </div>
  );
};

export default ServicesContent;

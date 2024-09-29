import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing images
import mission from "../_assets/mission.png";
import values from "../_assets/values.png";
import services from "../_assets/services.png";
import team from "../_assets/team.png";
import why from "../_assets/why.png";
import visit from "../_assets/visit.png";

const sectionsData = [
  {
    title: "Our Mission",
    img: mission,
    alt: "Mission",
    text: "To deliver top-notch beauty services while fostering a warm and inviting environment where clients can unwind and feel pampered.",
  },
  {
    title: "Our Values",
    img: values,
    alt: "Our values",
    text: `Excellence: Striving for the highest standards in every service we provide. 
    Customer Satisfaction: Prioritizing the needs and comfort of our clients. 
    Innovation: Staying updated with the latest beauty trends and techniques. 
    Integrity: Ensuring honesty and transparency in all our interactions.`,
  },
  {
    title: "Our Services",
    img: services,
    alt: "Our services",
    text: `We offer a wide range of beauty and wellness services tailored to meet your unique needs:
    Hair Services: Cuts, coloring, styling, and treatments. 
    Skincare: Facials, peels, and other skin treatments. 
    Nail Services: Manicures, pedicures, and nail art. 
    Makeup: Professional makeup for all occasions. 
    Spa Treatments: Massages, body treatments, and more.`,
  },
  {
    title: "Our Team",
    img: team,
    alt: "Our team",
    text: `Our team of skilled and passionate professionals is dedicated to providing you with an unforgettable salon experience.`,
  },
  {
    title: "Why choose us?",
    img: why,
    alt: "Why choose us",
    text: `Expertise: Our team is trained in the latest beauty techniques. 
    Personalized Service: We tailor our services to meet your specific needs. 
    High-Quality Products: We use only the best products to ensure the best results. 
    Relaxing Atmosphere: Our salon is designed to be a peaceful retreat from the hustle and bustle.`,
  },
  {
    title: "Visit Us",
    img: visit,
    alt: "Visit us",
    text: `We invite you to visit Salon Olivia and experience the ultimate in beauty and relaxation. Book your appointment today and let us help you look and feel your best.`,
  },
];

// Reusable Section Component
const Section = ({ img, alt, title, text }) => (
  <div className="row justify-content-center">
    <div className="col-md-6 text-center">
      <img src={img} alt={alt} className="img-fluid mb-4" />
      <h2>{title}</h2>
      <p className="text-justify" style={{ textAlign: "justify" }}>
        {text}
      </p>
    </div>
  </div>
);

const AboutUsContext = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="container position-relative" style={{ zIndex: 2 }}>
      <h1 className="">Services</h1>

      {/* Welcome Section */}
      <div className="Welcome text-center mb-5 p-3">
        <h3>Welcome to Salon Olivia</h3>
        <p>
          At Salon Olivia, we believe in enhancing natural beauty with the
          perfect blend of style and elegance. Our mission is to provide
          exceptional service and create a relaxing, rejuvenating experience for
          all our clients.
        </p>
      </div>

      {/* Reusable Sections */}
      {sectionsData.map((section, index) => (
        <Section key={index} {...section} />
      ))}

      {/* Centered Appointment Button */}
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

export default AboutUsContext;

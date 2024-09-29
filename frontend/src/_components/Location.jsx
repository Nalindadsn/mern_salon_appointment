import React from "react";

const Location = () => {
  return (
    <div className="container py-5">
      <h2>Our Location</h2>
      <div
        className="map-container"
        style={{ position: "relative", height: "400px", width: "100%" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.6581963397423!2d80.56666653660996!3d7.756229160387842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcb36c054a6887%3A0x56765b443de9e10d!2sSalon%20Olivia!5e0!3m2!1sen!2slk!4v1726113599582!5m2!1sen!2slk"
          style={{ border: 0, height: "100%", width: "100%" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;

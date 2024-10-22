import React from "react";
import backgroundImage from "../assets/bg.png";

const Background = () => {
  return (
    <div className="position-relative text-center bg-dark">
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default Background;

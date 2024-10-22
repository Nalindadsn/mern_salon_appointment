import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import facebookLogo from "../assets/icons/facebook.svg";
import instagramLogo from "../assets/icons/instagram.svg";
import xLogo from "../assets/icons/twitter.svg";
import youtubeLogo from "../assets/icons/youtube.svg";

const FollowUs = () => {
  return (
    <div className="follow-us-container py-3">
      <div className="container text-center">
        <h2 className="text-black mb-4">Follow Us</h2>

        <div className="d-flex justify-content-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src={facebookLogo} alt="Facebook" className="social-logo" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src={instagramLogo} alt="Instagram" className="social-logo" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src={xLogo} alt="X" className="social-logo" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <img src={youtubeLogo} alt="YouTube" className="social-logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;

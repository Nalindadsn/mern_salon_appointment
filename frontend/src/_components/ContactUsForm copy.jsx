import React from "react";
import contactImage from "../_assets/contact-img.png";

const ContactUsForm = () => {
  return (
    <div style={{ backgroundColor: "#e6e2df", width: "100vw" }}>
      <div className="contact-section-1 container py-5">
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <h2>Phone</h2>
            <p>+94 77 586 126</p>
          </div>

          <div className="col-md-3 mb-4">
            <h2>Email</h2>
            <p>salonolivia1200@gmail.com</p>
          </div>

          <div className="col-md-3 mb-4">
            <h2>Location</h2>
            <p>Matale Rd, Galewela</p>
          </div>

          <div className="col-md-3 mb-4">
            <h2>Opening Hours</h2>
            <p>Monday - Friday: 9am - 5pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      <hr style={{ 
        border: "1px solid black", 
        width: "80%", 
        margin: "40px auto" 
      }} />

      <div className="contact-section-2 container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 contact-form">
            <h2>Contact Form</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstname" placeholder="Enter your first name" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastname" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>

          <div className="col-md-6 contact-image d-flex justify-content-center">
            <img
              src={contactImage}
              alt="Contact"
              className="img-fluid"
              style={{ maxHeight: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;

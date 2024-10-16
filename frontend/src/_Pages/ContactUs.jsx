import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import backgroundImage from "./background.jpg"; // Import your background image
import  ContactUsForm  from "../_components/ContactUsForm";
import contactImage from "../_assets/contact-img.png";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import Layout from "../components/Layout";
const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageStatus, setMessageStatus] = useState("");
  // Submit for Contact
  const submitHandler = async (values) => {
    try {
      dispatch(showLoading());

      const { data } = await axios.post("/api/contact/create", values).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      dispatch(hideLoading());
      if (data.success) {
        // setMessageStatus("sent");
        message.success("message created Successful");
        navigate("/contact/sent");
        
        // <Rediect to="/"  />;
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("message sending Fail");
    }
  };

  return (
    <>
    <Layout>
    {/* <ContactUsForm /> */}
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

        <hr
          style={{
            border: "1px solid black",
            width: "80%",
            margin: "40px auto",
          }}
        />

        <div className="contact-section-2 container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 contact-form">

              <div>
                <ContactUsForm user={user}/>
              </div>
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
      </div></Layout>
    </>
  );
};

export default Contact;

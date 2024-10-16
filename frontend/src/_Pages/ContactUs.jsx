import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import backgroundImage from "./background.jpg"; // Import your background image
import  ContactUsForm  from "../_components/ContactUsForm";
import contactImage from "../_assets/contact-img.png";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
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





  
  const [userInfo, setUser] = useState(null);

  const params = useParams();
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/user/getUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    //eslint-disable-next-line
  }, []);

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
          <div className="row ">
            <div className="col-md-6 contact-form">

              <div>
                {
                  userInfo ? (
                    <ContactUsForm userInfo={userInfo} />
                  ) : (
                    <ContactUsForm />
                  )
                }
              </div>
            </div>

            <div className="col-md-6 contact-image ">

            <iframe style={{border:0,marginBottom:"10px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7620362699313!2d79.86990536888315!3d6.919027003175615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259520bddf619%3A0xc917d277dcfbb46f!2sSalon%20Olivia!5e0!3m2!1sen!2slk!4v1729092875593!5m2!1sen!2slk" width="100%" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

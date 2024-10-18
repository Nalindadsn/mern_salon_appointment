import AboutUsContext from "../_components/AboutUsContent";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import backgroundImage from "./background.jpg"; // Import your background image
import ContactUsForm from "../_components/ContactUsForm";
import contactImage from "../_assets/contact-img.png";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Background from "../_components/Background";
import { Carousel } from "react-bootstrap";
import { FaUser, FaUserAlt } from "react-icons/fa";
const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageStatus, setMessageStatus] = useState("");
  // Submit for Contact
  const submitHandler = async (values) => {
    try {
      dispatch(showLoading());

      const { data } = await axios
        .post("/api/contact/create", values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
        <Background />
        <AboutUsContext />
        <div style={{ backgroundColor: "#e6e2df", width: "100vw" }}>
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
                  {userInfo ? (
                    <ContactUsForm userInfo={userInfo} />
                  ) : (
                    <ContactUsForm />
                  )}
                </div>
              </div>

              <div className="col-md-6 contact-image text-center">
                <Carousel data-bs-theme="dark">
                  <Carousel.Item style={{ minHeight: "250px" }}>
                    <FaUserAlt
                      style={{ fontSize: "3rem", marginTop: "30px" }}
                    />
                    <h5>Nalinda Dissanayaka</h5>
                    <p style={{ margin: "0 10% 50px 10%" }}>
                      Nulla vitae elit libero, a pharetra augue molliulla vitae
                      elit libero, a pharetra augue molliulla vitae elit libero,
                      a pharetra augue molliulla vitae elit libero, a pharetra
                      augue molliulla vitae elit libero, a pharetra augue
                      molliulla vitae elit libero, a pharetra augue molliulla
                      vitae elit libero, a pharetra augue molliulla vitae elit
                      libero, a pharetra augue molliulla vitae elit libero, a
                      pharetra augue mitae elit libero, a pharetra augue
                      molliulla vitae elit libero, a pharetra augue molliulla
                      vitae elit libero, a pharetra augue molliulla vitae elit
                      libero, a pharetra augue molliulla vitae elit libero, a
                      pharetra augue molliulla vitae elit libero, a pharetra
                      augue mollis interdum.
                    </p>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;

// <div className="row" style={{ margin: "5%" }}>
// <div className="col-md-6">
//   {JSON.stringify(userInfo)}
//   {params.id}
//   <TestimonialForm userInfo={userInfo} />
// </div>
// <div className="col-md-6">
//   <div
//     className="container position-relative"
//     style={{ zIndex: 2, textAlign: "center" }}
//   >
//     <Carousel data-bs-theme="dark">
//       <Carousel.Item style={{ minHeight: "250px" }}>
//         <FaUser style={{ fontSize: "3rem", marginTop: "30px" }} />
//         <h5>Nalinda Dissanayaka</h5>
//         <p style={{ margin: "0 10% 50px 10%" }}>
//           Nulla vitae elit libero, a pharetra augue molliulla vitae
//           elit libero, a pharetra augue molliulla vitae elit libero, a
//           pharetra augue molliulla vitae elit libero, a pharetra augue
//           molliulla vitae elit libero, a pharetra augue molliulla
//           vitae elit libero, a pharetra augue molliulla vitae elit
//           libero, a pharetra augue molliulla vitae elit libero, a
//           pharetra augue molliulla vitae elit libero, a pharetra augue
//           mitae elit libero, a pharetra augue molliulla vitae elit
//           libero, a pharetra augue molliulla vitae elit libero, a
//           pharetra augue molliulla vitae elit libero, a pharetra augue
//           molliulla vitae elit libero, a pharetra augue molliulla
//           vitae elit libero, a pharetra augue mollis interdum.
//         </p>
//       </Carousel.Item>
//     </Carousel>
//   </div>
// </div>
// </div>

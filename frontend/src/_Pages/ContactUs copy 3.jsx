import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import backgroundImage from "./background.jpg"; // Import your background image
import ContactUsForm from "../_components/ContactUsForm";
import contactImage from "../assets/contact-img.png";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
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

  return (
    <>
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
              <h2>Contact Form</h2>

              <div>
                <div>
                  <Form layout="vertical" onFinish={submitHandler}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Form.Item
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                            {
                              min: 3,
                              message:
                                "Your name must be at least 3 characters",
                            },
                            {
                              max: 50,
                              message: "Your name cannot exceed 50 characters",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="firstName"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-md-6 mb-3">
                        <Form.Item
                          name="lastName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                            {
                              min: 3,
                              message:
                                "Your name must be at least 3 characters",
                            },
                            {
                              max: 50,
                              message: "Your name cannot exceed 50 characters",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="lastName"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Form.Item
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                            {
                              min: 3,
                              message:
                                "Your name must be at least 3 characters",
                            },
                            {
                              max: 50,
                              message: "Your name cannot exceed 50 characters",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="phone"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-md-6 mb-3">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            { type: "email", message: "Invalid email!" },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <Form.Item
                      name="message"
                      rules={[
                        { required: true, message: "Please input your name!" },
                        {
                          min: 3,
                          message: "Your name must be at least 3 characters",
                        },
                        {
                          max: 50,
                          message: "Your name cannot exceed 50 characters",
                        },
                      ]}
                    >
                      {/* <Input
              prefix={<UserOutlined />}
              
            /> */}
                      <TextArea rows={4} placeholder="message" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          backgroundColor: "#1877f2",
                          borderColor: "#1877f2",
                        }}
                      >
                        Send Message
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
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
      </div>
    </>
  );
};

export default Contact;

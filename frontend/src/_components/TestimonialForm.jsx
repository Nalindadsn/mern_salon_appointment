import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import TextArea from "antd/es/input/TextArea";
// import backgroundImage from "./background.jpg"; // Import your background image
import { Rating } from "react-simple-star-rating";

const TestimonialForm = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  // Submit for TestimonialForm
  const submitHandler = async (values) => {
    try {
      if (userInfo !== null) {
        values.userId = userInfo._id;
      }
      setLoading(true);
      dispatch(showLoading());
      values.rate = rating.toString();

      const { data } = await axios({
        method: "post",
        baseURL: "http://localhost:4000",
        url: `/api/user/createTestimonial`,
        data: values,
      });

      dispatch(hideLoading());
      if (data.success) {
        // localStorage.setItem("token", data.token);
        message.success("Message sent Successful");
        navigate("/user/testimonial");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      if (error.response) {
        // Server error with specific status codes
        if (error.response.status === 401) {
          message.error("Invalid credentials. Please try again.");
        } else if (error.response.status === 500) {
          message.error("Server error. Please try again later.");
        } else {
          message.error("Something went wrong");
        }
      } else if (error.request) {
        // Network error
        message.error("Network error. Please check your internet connection.");
      } else {
        // Other errors
        message.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          paddingTop: "60px",
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            textAlign: "center",
            color: "#1890ff",
          }}
        >
          Review
        </h2>
        {userInfo && (
          <Form
            layout="vertical"
            onFinish={submitHandler}
            initialValues={{
              firstName: userInfo?.name.split(" ")[0],
              lastName: userInfo?.name.split(" ").pop(),
            }}
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your firstName!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="First Name"
                style={{ marginBottom: "20px" }}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your lastName!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="Last Name"
                style={{ marginBottom: "20px" }}
              />
            </Form.Item>

            <Rating
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
              /* Available Props */
            />
            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              {/* <Input
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="Message"
              /> */}
              <TextArea rows={4} style={{ marginBottom: "20px" }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
                loading={loading}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        )}
        {userInfo === null && <>Please TestimonialForm</>}
      </div>
    </div>
  );
};

export default TestimonialForm;

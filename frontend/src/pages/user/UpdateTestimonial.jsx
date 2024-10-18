import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import TextArea from "antd/es/input/TextArea";

import { useState } from "react";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";
import { useEffect } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
const UpdateTestimonial = () => {
  const [url, setUrl] = useState("");
  const { user } = useSelector((state) => state.user);

  const [testimonialInfo, setTestimonial] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/updateTestimonial",
        {
          ...values,
          testimonialId: params?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("record updated successfully");

        navigate("/user/testimonial");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const getTestimonialInfo = async (id) => {
    // alert(params?.id);
    try {
      const res = await axios.post(
        "/api/user/getTestimonialInfo",
        { testimonialId: params?.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // alert(JSON.stringify(res.data.data));
        setTestimonial(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestimonialInfo(params?.id);

    //eslint-disable-next-line
  }, [params?.id]);

  function UploadInput() {
    return (
      <div className="flex items-center justify-center w-full text-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              style={{ height: "100px", width: "100px" }}
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
            // multiple
          />
        </label>
      </div>
    );
  }
  return (
    <LayoutWithSidebar>
      <h3 className="text-center">Update Testimonial</h3>
      <div className="flex justify-center flex-col m-8 ">
        <Row gutter={20}>
          <Col xs={24} md={12} lg={12}>
            <div></div>
          </Col>
        </Row>
      </div>
      {testimonialInfo?.firstName}
      {testimonialInfo && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            firstName: testimonialInfo?.firstName,
            lastName: testimonialInfo?.lastName,
            rate: testimonialInfo?.rate,
            status: testimonialInfo?.status,

            message: testimonialInfo?.message,
          }}
        >
          <Row gutter={20}>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[
                  {
                    required: true,
                    message: "Testimonial first name is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Testimonial Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[
                  {
                    required: true,
                    message: "Testimonial last name is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Testimonial Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Rate"
                name="rate"
                required
                rules={[
                  {
                    required: true,
                    message: "rate is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Testimonial Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Status"
                name="status"
                required
                rules={[
                  {
                    required: true,
                    message: "status is required",
                  },
                ]}
              >
                <Select>
                  <Select.Option value={`pending`}>Pending</Select.Option>
                  <Select.Option value={`published`}>Published</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={24}>
              <Form.Item label="Testimonial" name="message">
                <TextArea rows={4} placeholder="Testimonial Testimonial" />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}></Col>
            <Col style={{ textAlign: "left", width: "100%" }}>
              <Button className="btn btn-primary form-btn" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </LayoutWithSidebar>
  );
};

export default UpdateTestimonial;

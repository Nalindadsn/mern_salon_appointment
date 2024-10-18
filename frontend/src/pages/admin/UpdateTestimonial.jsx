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
import { Rating } from "react-simple-star-rating";

const UpdateTestimonial = () => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

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
          rate: rating,
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

        navigate("/admin/testimonial");
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
    setRating(parseInt(testimonialInfo?.rate));
    //eslint-disable-next-line
  }, [params?.id, testimonialInfo?.rate]);

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
      {rating}
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

            <Rating onClick={handleRating} initialValue={rating} />

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

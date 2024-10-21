import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import TextArea from "antd/es/input/TextArea";

import assets from "../_assets/assets.gif";

import { useState } from "react";
import LayoutWithSidebar from "../components/LayoutwithSidebar";
const AddCoupon = () => {
  const [url, setUrl] = useState("");
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    if (values.amount > 100) {
      message.error("Amount should be less than 100");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/admin/add-coupon",
        {
          ...values,
          image: url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin/coupons");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  // upload images
  const [loading, setLoading] = useState(false);
  const coupongenerator = () => {
    var coupon = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
      coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return coupon;
  };
  return (
    <LayoutWithSidebar>
      <h3 className="text-center">Add Coupon</h3>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="m-3"
        initialValues={{
          code: coupongenerator(),
        }}
      >
        <Row gutter={20}>
          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Amount"
              name="amount"
              required
              rules={[{ required: true, message: "Coupon amount is required" }]}
            >
              <Input type="text" placeholder="10%" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="code"
              name="code"
              required
              rules={[{ required: true, message: "Coupon code is required" }]}
            >
              <Input type="text" placeholder="code Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="expireDate"
              name="expireDate"
              required
              rules={[{ required: true, message: "Expire Date is required" }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <br />
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </LayoutWithSidebar>
  );
};

export default AddCoupon;

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
    // alert(url)
    if (!url) {
      message.error("Please upload image");
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function uploadSingleImage(base64) {
    setLoading(true);
    await axios
      .post("/api/uploadImage", { image: base64 })
      .then((res) => {
        setUrl(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  // async function uploadMultipleImages(images) {
  //   setLoading(true);
  //   await axios
  //     .post("/api/uploadMultipleImages", { images })
  //     .then((res) => {
  //       setUrl(res.data);
  //       alert("Image uploaded Succesfully");
  //     })
  //     .then(() => setLoading(false))
  //     .catch(console.log);
  // }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    // uploadMultipleImages(base64s);
  };

  return (
    <LayoutWithSidebar>
      <h3 className="text-center">Add Coupon</h3>

      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <Row gutter={20}>
          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Amount"
              name="amount"
              required
              rules={[{ required: true, message: "Coupon amount is required" }]}
            >
              <Input type="text" placeholder="Amount" />
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
            <Form.Item label="expireDate" name="expireDate">
              <TimePicker format="DDDD-MM-dd HH:mm" />
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

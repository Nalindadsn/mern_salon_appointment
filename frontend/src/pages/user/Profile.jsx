import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../../components/Layout";


const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const starttime = values.starttime.format("HH:mm");
      const endtime = values.endtime.format("HH:mm");
      const res = await axios.post(
        "/api/user/updateUser",
        {
          ...values,
          userId: user._id,
          starttime,
          endtime,
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong ");
    }
  };
  // update doc ==========

  //getDOc Details
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
    <Layout>
      <h3 align="center">Manage Profile</h3>
      {JSON.stringify(userInfo)}
      {userInfo && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...userInfo,
            starttime: moment(userInfo.starttime, "HH:mm"),
            endtime: moment(userInfo.endtime, "HH:mm")
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
         
        </Form>
      )}
    </Layout>
  );
};

export default Profile;

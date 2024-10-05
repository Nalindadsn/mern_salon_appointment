import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../../components/Layout";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";


const UpdateUser = () => {
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
      // const starttime = values.starttime.format("HH:mm");
      // const endtime = values.endtime.format("HH:mm");
      const res = await axios.post(
        "/api/user/updateUser",
        {
          ...values,
          userId: params._id,
          // starttime,
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
        window.location.reload(); 
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
    <LayoutWithSidebar>
      <h3 align="center">Manage UpdateUser</h3>
    -  {JSON.stringify(params)}-
      {userInfo && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...userInfo,
            // starttime: moment(userInfo.starttime, "HH:mm"),
            // endtime: moment(userInfo.endtime, "HH:mm")
          }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Last Name"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="username"
                name="username"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="username" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="isAdmin"
                name="isAdmin"
                required
                rules={[{ required: true }]}
              >
                {/* <Input type="text" placeholder="isAdmin" /> */}
                <Select>
                  <Select.Option value={true}>Admin</Select.Option>
                  <Select.Option value={false}>User</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Email" />
                
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        
        </Form>
      )}
      {/* )} */}
    </LayoutWithSidebar>
  );
};

export default UpdateUser;

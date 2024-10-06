import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import TextArea from "antd/es/input/TextArea";

import assets from "../_assets/assets.gif";

import { useState } from "react";
import LayoutWithSidebar from "../components/LayoutwithSidebar";
import { useEffect } from "react";
const UpdateService = () => {
  const [url, setUrl] = useState("");
  const params = useParams();
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
      const starttime = values.starttime.format("HH:mm");
      const endtime = values.endtime.format("HH:mm");
      const res = await axios.post(
        "/api/user/update-service",
        {
          ...values,
          serviceId: params.id,
          starttime,
          endtime,
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const getServiceInfo = async (id) => {
    // alert(params?.id);
    try {
      const res = await axios.post(
        "/api/admin/getServiceInfo",
        { _id: id ,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // alert(JSON.stringify(res.data.data));
        setService(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceInfo(params?.id);

    //eslint-disable-next-line
  }, [params?.id]);

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
      <h3 className="text-center">Update Service</h3>
      upload image
      <div className="flex justify-center flex-col m-8 ">
      <Row gutter={20}>
        
      <Col  xs={24} md={12} lg={12} className="border pb-5">
          
          <div>
            {loading ? (
              <div className="flex items-center justify-center">
                <img src={assets} />{" "}
              </div>
            ) : (
              <UploadInput />
            )}
          </div></Col>
          <Col xs={24} md={12} lg={12}>
          <div>
       
        
        <div style={{backgroundColor:"#ccc"}}>
            {url && (
              <div>
                Access you file at{" "}
                <div style={{overflowX:"hidden"}}>
    
                <a href={url} target="_blank" rel="noopener noreferrer">
                  
                  {url}<br/>              <img src={url} alt="upload image" style={{width:"200px"}}  />{" "}
    
                </a></div>
              </div>
            )}
          </div>
      </div>
          </Col>
        </Row>
      
    </div>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <Row gutter={20}>
          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[{ required: true, message: "Service name is required" }]}
            >
              <Input type="text" placeholder="Service Name" />
            </Form.Item>
          </Col>
        
          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea rows={4}  placeholder="Service Description"/>
            </Form.Item>
          </Col>
         
        </Row>
        <br />
        <Row gutter={20}>
          
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true, message: "Fee is required" }]}
            >
              <Input type="text" placeholder="Fee" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="starttime"
              label="Start Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              name="endtime"
              label="End Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
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

export default UpdateService;

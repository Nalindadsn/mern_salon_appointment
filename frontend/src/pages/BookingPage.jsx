import { DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Col, Row } from "react-bootstrap";
// import "./../_styles/LayoutStyles.css";
import QrReader from "react-qr-scanner";
const BookingPage = () => {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");
  const handleScan = (data) => {
    setState(data);
  };
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: 240,
    width: 320,
  };

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [services, setServices] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/service/getServiceById",
        { serviceId: params.serviceId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleAvailability function
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/booking-availability",
        {
          serviceId: params.serviceId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/book-appointment",
        {
          serviceId: params.serviceId,
          userId: user._id,
          serviceInfo: services,
          userInfo: user,
          date: date,
          time: time,
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
        navigate("/user/appointments");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container pb-5">
        <h3 className="text-center my-4">Book an Appointment</h3>

        {services && (
          <Row style={{ width: "100%" }}>
            <Col md={6}>
              <div className="  mb-4">
                <div className="">
                  <h5 className=" text-center">{services.name}</h5>
                  <h6 className=" mb-2 text-muted text-center">
                    Fees: LKR {services.feesPerConsultation}
                  </h6>
                  <h6 className=" mb-2 text-muted text-center">
                    Timings: {services.starttime} - {services.endtime}
                  </h6>
                  <div className="">
                    <div className="d-flex flex-column w-50 mx-auto">
                      <DatePicker
                        className="m-2 date-picker"
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                          const selectedDate = value
                            ? value.format("DD-MM-YYYY")
                            : "";
                          setDate(selectedDate);
                        }}
                      />
                      <TimePicker
                        format="HH:mm"
                        className="m-2 time-picker"
                        onChange={(time) =>
                          setTime(time && time.format("HH:mm"))
                        }
                      />
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary mt-2 w-100"
                          onClick={handleAvailability}
                        >
                          Check Availability
                        </button>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-dark mt-2 w-100"
                          onClick={handleBooking}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                  />
                  <p>{result}</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <img
                src={services.image}
                alt={services.name}
                className="img-fluid"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

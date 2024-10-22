import { Badge, Button, DatePicker, Input, TimePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import QrReader from "../components/QrReader";
// import "./../_styles/LayoutStyles.css";
// import QrReader from "react-qr-scanner";
const BookingPage = () => {
  const location = useLocation();
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
  const [coupon, setCoupon] = useState(
    location?.search.split("code=").pop()
      ? location?.search.split("code=").pop()
      : ""
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [searchParams] = useSearchParams();

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
  const [couponInfo, setCouponInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [couponExpired, setCouponExpired] = useState(false);

  const getCouponData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/user/getCouponInfo",
        { serviceId: params.serviceId, coupon },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res?.data.expired) {
        // setCouponInfo(null);
        setCouponExpired(true);
        setCouponInfo(res.data.data);
        setLoading(false);
        return message.error(res.data.message);
      }
      if (res.data.success) {
        setCouponExpired(false);
        message.success(res.data.message);
        setCouponInfo(res.data.data);
        setLoading(false);
      } else {
        setCouponExpired(true);
        setLoading(false);
        return message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      const feeVal = couponInfo
        ? services.feesPerConsultation -
          (couponExpired
            ? 0
            : services.feesPerConsultation * couponInfo.amount) /
            100
        : services.feesPerConsultation;

      const res = await axios.post(
        "/api/user/book-appointment",
        {
          serviceId: params.serviceId,
          userId: user._id,
          serviceInfo: services,
          userInfo: user,
          date: date,
          time: time,
          fee: feeVal,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // alert(JSON.stringify(res));
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res.data);
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
  function handleChange(e) {
    setCoupon(e.target.value);
  }
  const [qr, setQr] = useState(false);
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
                    Fees: LKR {loading && <Spinner />}
                    {couponInfo !== null && couponInfo?.code == coupon ? (
                      <>
                        {services.feesPerConsultation -
                          (couponExpired
                            ? 0
                            : services.feesPerConsultation *
                              couponInfo.amount) /
                            100}
                        <br />
                        <code
                          className={`border ${
                            couponExpired ? "text-danger" : "text-success"
                          } px-1`}
                        >
                          {" "}
                          {coupon} Coupon Applied
                        </code>
                        <br />
                        {couponExpired ? (
                          <span className="text-danger">Coupon Expired</span>
                        ) : (
                          <strike className="text-danger">
                            LKR
                            {services.feesPerConsultation}
                          </strike>
                        )}
                      </>
                    ) : (
                      services.feesPerConsultation
                    )}
                  </h6>
                  <h6 className=" mb-2 text-muted text-center">
                    Timings: {services.starttime} - {services.endtime}
                  </h6>
                  <div className="">
                    <div className="d-flex flex-column w-50 mx-auto">
                      <DatePicker
                        className="mb-2 date-picker"
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
                        className="mb-2 time-picker"
                        onChange={(time) =>
                          setTime(time && time.format("HH:mm"))
                        }
                      />
                      <hr />

                      <div className="d-flex justify-content-between gap-2 ">
                        <Input
                          placeholder="Coupon"
                          type="text"
                          value={coupon}
                          onChange={handleChange}
                        />
                        {!qr && <Button onClick={getCouponData}>Apply</Button>}
                        <Button
                          onClick={() => (!qr ? setQr(true) : setQr(false))}
                        >
                          {!qr ? "Show QR" : "Hide QR"}
                        </Button>
                      </div>

                      {qr && <QrReader />}
                      {/* <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary mt-2 w-100"
                          onClick={handleAvailability}
                        >
                          Check Availability
                        </button>
                      </div> */}
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

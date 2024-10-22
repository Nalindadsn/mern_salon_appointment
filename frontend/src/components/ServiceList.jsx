import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Card } from "react-bootstrap";
import { Button } from "antd";
import QRCode from "react-qr-code";
const ServiceList = ({ service }) => {
  const navigate = useNavigate();

  const formatTimings = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  const formatFees = (fees) => {
    return `LKR ${fees}`;
  };

  return (
    <>
      <Card className="p-2">
        <img src={service.image} style={{ width: "100%" }} />
        <hr />
        <b> {service.name} </b>

        <p>
          <b>Fees Per Consultation:</b>{" "}
          {formatFees(service.feesPerConsultation)}
        </p>
        <p>
          <b>Timings:</b> {formatTimings(service.starttime, service.endtime)}
        </p>

        <Link to={`/service/book-appointment/${service._id}`}>
          <Button type="primary" style={{ width: "100%" }}>
            Book Now
          </Button>
        </Link>

        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
          }}
        >
          {/* <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`https://npmjs.com/package/react-qr-code`}
            viewBox={`0 0 256 256`}
          /> */}
        </div>
      </Card>
      {/*     
    <div
      className="border m-2"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/service/book-appointment/${service._id}`)}
    >
      <div className=" bg-white">
        <img src={service?.image} alt={service?.name} className="responsive w-full" style={{width:"100%"}}/>
       
      <div className="p-2"
        
        style={{  fontWeight: "bold" }}
      >
        {service.name} 
<hr/>
        
        <p>
          <b>Fees Per Consultation:</b> {formatFees(service.feesPerConsultation)}
        </p>
        <p>
          <b>Timings:</b> {formatTimings(service.starttime, service.endtime)}
        </p>
      </div>
       
        Additional features can be added here 
      </div>
    </div>*/}
    </>
  );
};

export default ServiceList;

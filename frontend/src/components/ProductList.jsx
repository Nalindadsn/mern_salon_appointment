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
const ProductList = ({ product }) => {
  const navigate = useNavigate();

  const formatTimings = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  const formatFees = (fees) => {
    return `$${fees}`;
  };

  return (
    <>
      <Card className="p-2">
        <img
          src={product.image}
          style={{ width: "100%" }}
        />
        <hr />
        <b> {product.name} </b>

        <p>
          <b>Fees Per Consultation:</b>{" "}
          {formatFees(product.feesPerConsultation)}
        </p>
        <p>
          <b>Timings:</b> {formatTimings(product.starttime, product.endtime)}
        </p>
        <Link to={`/product/book-appointment/${product._id}`}>
          <Button type="primary" style={{ width: "100%" }}>
            Book Now
          </Button>
        </Link>
      </Card>
      {/*     
    <div
      className="border m-2"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/product/book-appointment/${product._id}`)}
    >
      <div className=" bg-white">
        <img src={product?.image} alt={product?.name} className="responsive w-full" style={{width:"100%"}}/>
       
      <div className="p-2"
        
        style={{  fontWeight: "bold" }}
      >
        {product.name} 
<hr/>
        
        <p>
          <b>Fees Per Consultation:</b> {formatFees(product.feesPerConsultation)}
        </p>
        <p>
          <b>Timings:</b> {formatTimings(product.starttime, product.endtime)}
        </p>
      </div>
       
        Additional features can be added here 
      </div>
    </div>*/}
    </>
  );
};

export default ProductList;

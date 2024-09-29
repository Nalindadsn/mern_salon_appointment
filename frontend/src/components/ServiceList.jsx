import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceList = ({ service }) => {
  const navigate = useNavigate();

  const formatTimings = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  const formatFees = (fees) => {
    return `$${fees}`;
  };

  return (
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
       
        {/* Additional features can be added here */}
      </div>
    </div>
  );
};

export default ServiceList;

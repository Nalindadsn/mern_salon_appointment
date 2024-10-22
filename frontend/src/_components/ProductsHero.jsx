import React from "react";
import { useNavigate } from "react-router-dom";

// Importing images
import sc1 from "../assets/sc1.png";
import sc2 from "../assets/sc2.png";
import sc3 from "../assets/sc3.png";
import d1 from "../assets/d1.png";
import d2 from "../assets/d2.png";
import d3 from "../assets/d3.png";
import c1 from "../assets/c1.png";
import a1 from "../assets/a1.png";

// Reusable ProductsColumn Component
const ProductsColumn = ({ title, imgSrc, altText }) => {
  return (
    <div className="col-md-4 mb-4 p-3">
      <h2>{title}</h2>
      <img
        src={imgSrc}
        alt={altText}
        className="img-fluid"
        style={{
          width: "70%",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

const ProductsHero = ({ brandList }) => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="container position-relative" style={{ zIndex: 2 }}>
      <h1 className="">Products</h1>
      <div className="Welcome text-center mb-5 p-3">
        <h3>Welcome to Salon Olivia</h3>
        <p>
          At Salon Olivia, we offer a curated selection of the finest beauty and
          wellness products to help you maintain your salon-fresh look at home.
          Explore our range of top-quality products, including renowned Sri
          Lankan brands and trusted global names.
        </p>
      </div>

      {brandList.map((brand) => {
        return (
          <div>
            <h3 className="text-center mb-4 ml-5">{brand?.brand}</h3>
            <div className="row d-flex justify-content-center">
              {brand?.products?.map((product) => {
                return (
                  <>
                    <ProductsColumn
                      title={product?.name}
                      imgSrc={product?.image}
                      altText="sc1"
                    />
                  </>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* <h3 className="text-center mb-4">Dreamron</h3>
      <div className="row d-flex justify-content-center">
        <ProductsColumn
          title="Dreamron Anti-Acne Creams"
          imgSrc={d1}
          altText="d1"
        />
        <ProductsColumn
          title="Dreamron Aloe Vera Conditioning Shampoo"
          imgSrc={d2}
          altText="d2"
        />
        <ProductsColumn
          title="Dreamron Cucumber Cleansing Cream"
          imgSrc={d3}
          altText="d3"
        />
      </div>

      <div className="row d-flex justify-content-center text-center">
        <ProductsColumn title="CeraVe" imgSrc={c1} altText="c1" />
      </div>
      
      <div className="row d-flex justify-content-center text-center">
        <ProductsColumn title="Azature" imgSrc={a1} altText="a1" />
      </div>
      <div className="d-flex justify-content-center my-5">
        <button
          className="btn btn-primary px-4 py-2"
          style={{
            backgroundColor: "#CB1276",
            borderColor: "#CB1276",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#a91062")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#CB1276")}
          onClick={handleAppointmentClick}
        >
          Make an appointment
        </button>
      </div> */}
    </div>
  );
};

export default ProductsHero;

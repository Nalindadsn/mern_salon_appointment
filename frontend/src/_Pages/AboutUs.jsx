import React from "react";
import Background from "../_components/Background";
import Footer from "../_components/Footer";
import AboutUsContext from "../_components/AboutUsContent";
import Layout from "../components/Layout";
import Carousel from "react-bootstrap/Carousel";
import { FaUser } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Background />
        <AboutUsContext />
        <div
          className="container position-relative"
          style={{ zIndex: 2, textAlign: "center" }}
        >
          <Carousel data-bs-theme="dark">
            <Carousel.Item style={{ minHeight: "250px" }}>
              <FaUser style={{ fontSize: "3rem", marginTop: "30px" }} />
              <h5>Nalinda Dissanayaka</h5>
              <p style={{ margin: "0 10% 50px 10%" }}>
                Nulla vitae elit libero, a pharetra augue molliulla vitae elit
                libero, a pharetra augue molliulla vitae elit libero, a pharetra
                augue molliulla vitae elit libero, a pharetra augue molliulla
                vitae elit libero, a pharetra augue molliulla vitae elit libero,
                a pharetra augue molliulla vitae elit libero, a pharetra augue
                molliulla vitae elit libero, a pharetra augue molliulla vitae
                elit libero, a pharetra augue mitae elit libero, a pharetra
                augue molliulla vitae elit libero, a pharetra augue molliulla
                vitae elit libero, a pharetra augue molliulla vitae elit libero,
                a pharetra augue molliulla vitae elit libero, a pharetra augue
                molliulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </Carousel.Item>
          </Carousel>
        </div>
      </Layout>
    </>
  );
};

export default AboutUs;

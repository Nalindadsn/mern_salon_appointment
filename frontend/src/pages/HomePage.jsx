import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Empty, Input, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ServiceList from "../components/ServiceList";
import Layout from "../components/Layout";
import HeroSection from "../_components/HeroSection";

const { Search } = Input;
const { Title, Text } = Typography;

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/getAllServices", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setServices(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value?.trim().toLowerCase());
  };

  const filteredServices = services.filter(
    (service) =>
      service?.name?.toLowerCase().includes(searchQuery) ||
      service?.description?.toLowerCase().includes(searchQuery)
  );

  return (
    <Layout>
      {/* {JSON.stringify(services)} */}
      <HeroSection />
      <div className="container">
        <Row justify="center" style={{ marginBottom: "24px" }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Title level={2}>Find a Service</Title>
            <Text type="secondary">
              Book appointments with trusted healthcare professionals
            </Text>
            <br />
            <Space direction="vertical" style={{ marginTop: 16 }}>
              <Search
                placeholder="Search by name or specialization"
                allowClear
                onSearch={handleSearch}
                prefix={<SearchOutlined />}
                style={{ maxWidth: "300px" }}
              />
            </Space>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            {loading ? (
              <Spin size="large" />
            ) : filteredServices.length > 0 ? (
              <Row gutter={[16, 16]}>
                {filteredServices.map((service) => (
                  <Col key={service._id} xs={24} sm={12} md={8} lg={6}>
                    <ServiceList service={service} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty description="No services available" />
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;

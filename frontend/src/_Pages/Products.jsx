import Background from '../_components/Background'
import Layout from '../components/Layout'

import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Empty, Input, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductsHero from '../_components/ProductsHero'
import Footer from '../_components/Footer'

const { Search } = Input;
const { Title, Text } = Typography;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/getAllProducts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value?.trim().toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product?.name?.toLowerCase().includes(searchQuery) ||
      product?.description?.toLowerCase().includes(searchQuery) 
  );

  return (
    <>
    <Layout>
     <Background />
     
    {JSON.stringify(products)}
     <ProductsHero />
     
     </Layout> 
    {/* <Layout>
    <Background />
    <div className="container" >
      <Row justify="center" style={{ marginBottom: "24px" }} >
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={2}>Find a Product</Title>
          <Text type="secondary">
            Book appointments with trusted healthcare professionals
          </Text><br/>
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
          ) : filteredProducts.length > 0 ? (
            <Row gutter={[16, 16]}>
              {filteredProducts.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                  <ProductList product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="No products available" />
          )}
        </Col>
      </Row>
      </div>
    </Layout> */}
    </>
  )
}

export default Products


// import React from 'react'
// import Background from '../_components/Background'
// import Footer from '../_components/Footer'
// import ProductsHero from '../_components/ProductsHero'
// import Layout from '../components/Layout'

// const Products = () => {
//   return (
//     <>
//     {/* <Layout>
//     <Background />
//     <ProductsHero />
//     <Footer /></Layout> */}
//     </>
//   )
// }

// export default Products
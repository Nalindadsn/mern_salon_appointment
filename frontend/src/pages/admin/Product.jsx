import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, message, Button, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LayoutWithSidebar from "../../components/LayoutwithSidebar";

const { Search } = Input;

const Product = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/getAllProducts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/admin/changeProductStatus",
        { productId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getProduct();
      } else {
        message.error(res.data.message || "Failed to update account status.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const filteredProducts = products.filter((product) => {
    const fullName = `${product.name} ${product.lastName}`.toLowerCase();
    return fullName.includes(searchValue);
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.name} {record.lastName}
        </span>
      ),
      // responsive: ["xs"]
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Button
            className="m-1"
            type="primary"
            onClick={() => handleAccountStatus(record, "published")}
            disabled={record.status === "published"}
          >
            Publish
          </Button>
          <Button
            className="m-1"
            type="danger"
            onClick={() => handleAccountStatus(record, "rejected")}
            disabled={record.status === "rejected"}
          >
            Reject
          </Button>
          <Button
            className="m-1"
            onClick={() => {
              setSelectedProduct(record);
              setModalVisible(true);
            }}
          >
            View Details
          </Button>
                    <Link to={`/admin/products/${record._id}`}
          >
            Edit
          </Link>       
        </div>
      ),
    },
  ];

  return (
    <LayoutWithSidebar>
      <div className="mb-2">
        <h3 className="text-center m-3">All Product</h3>
        <Link to="/admin/add-product">Add Product</Link><br/>
        <Link to="/admin/products/pdf" className="ml-5">PDF</Link>
        <div className="d-flex align-items-center mb-2">
          <Search
            placeholder="Search by name"
            onSearch={handleSearch}
            enterButton
            style={{ marginRight: 10 }}
          />
          <Button onClick={handleClearSearch}>Clear</Button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        
        <Table columns={columns} dataSource={filteredProducts} />
      )}
      <Modal
        title="Product Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <p>
              Name: {`${selectedProduct.name} `}
            </p>
            <img src={selectedProduct.image} alt="Product" style={{ width: "100%"}}/>
            <p>Brand: {selectedProduct.brand}</p>
            <p>Description: {selectedProduct.description}</p>

            <p>Status: {selectedProduct.status}</p>
            <p>Product ID: {selectedProduct.userId}</p>
            <p>
              Created Date:{" "}
              {new Date(selectedProduct.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </LayoutWithSidebar>
  );
};

export default Product;

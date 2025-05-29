import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slice/productSlice";
import ProductCard from "../components/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";


export default function Shop() {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginationItems = Array.from({ length: totalPages }, (_, i) => (
    <Pagination.Item
      key={i + 1}
      active={i + 1 === currentPage}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </Pagination.Item>
  ));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  return (
    <Row className="m-4">
      <Col md={2}>
        <h5 className="mb-3">Categories</h5>
        <div
          className={`border rounded p-2 mb-2 shadow-sm text-capitalize ${
            selectedCategory === "All" ? "bg-dark text-white" : ""
          }`}
          onClick={() => handleCategoryClick("All")}
          style={{ cursor: "pointer" }}
        >
          All
        </div>
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`border rounded p-2 mb-2 shadow-sm text-capitalize ${
              selectedCategory === category ? "bg-dark text-white" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: "pointer" }}
          >
            {category}
          </div>
        ))}
      </Col>

      <Col md={10}>
        <h4 className="mb-4">
          {selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`}
        </h4>

        <Row>
          {loading ? (
            <div className="spinner-border mx-auto my-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) :(
            currentProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
                <ProductCard product={product}/>
              </Col>
            ))
          )}
        </Row>

        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">{paginationItems}</Pagination>
        )}
      </Col>
    </Row>
  );
}


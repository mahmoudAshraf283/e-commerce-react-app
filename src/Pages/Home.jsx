import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slice/productSlice";
import { useContext } from "react";
import ThemeContext from "../context/theme";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p className="text-center mx-auto">Error: {error}</p>;

  return (
    <div>
      <Row className={theme === "light" ? "hero" : "bg-dark  text-white vh-100"}>
        <Col className="my-auto text-center">
          <h2>Welcome to our Shop</h2>
          <p>Discover the best products at unbeatable prices!</p>
        </Col>
      </Row>

      <Row className="m-5">
        <Col>
          <h3>Featured Products</h3>
        </Col>
        <Col className="text-end">
          <Link to="/Shop" className="text-decoration-none text-secondary">
            See all
          </Link>
        </Col>
      </Row>

      <Row className="m-5">
        {products.slice(0, 4).map((product) => (
          <Col key={product.id} xs={12} md={6} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

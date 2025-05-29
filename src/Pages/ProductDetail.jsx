import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/slice/productSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../store/slice/cart";
import { addToFavourite, removeFromFavourite } from "../store/slice/favourite";
import ThemeContext from "../context/theme";
import { useContext } from "react";

export default function ProductDetail() {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products.find((p) => p.id === parseInt(id));

  const filteredProducts = products.filter(
    (p) => p.id !== parseInt(id) && p.category === product?.category
  );
  const favouriteItems = useSelector((state) => state.favourite.favourites);
  const isFavourite = favouriteItems.some((item) => item.id === product.id);
  function handleToggleFavourite(product) {
    if (isFavourite) {
      dispatch(removeFromFavourite(product));
    } else {
      dispatch(addToFavourite(product));
    }
  }

  if (loading || !product) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Card
        className={
          theme === "light"
            ? "bg-light m-5 border-0 shadow text-black"
            : "bg-black bg-gradient m-5 border-0 shadow text-white"
        }
      >
        <Row>
          <Col className="text-center">
            <img src={product.thumbnail} alt={product.title} className="w-50" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="mb-3">{product.title}</Card.Title>
              <Card.Text className="text-secondary">
                Price: {product.price} $
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Brand: {product.brand}</Card.Text>
              <Card.Text>Category: {product.category}</Card.Text>
              <Card.Text
                className={product.stock ? "text-success" : "text-danger"}
              >
                {product.stock ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <Card.Text>
                Rating:
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: i < product.rating ? "gold" : "lightgray" }}
                  >
                    ★
                  </span>
                ))}
              </Card.Text>
              <Row className="text-center">
                <Col className="d-flex justify-content-around" xs={12} md={4}>
                  <Button
                    variant={
                      theme === "light"
                        ? "btn btn-outline-dark border-0 mx-auto"
                        : "btn btn-outline-light border-0 mx-auto"
                    }
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Card.Text className="mx-2 my-auto">{quantity}</Card.Text>
                  <Button
                    variant={
                      theme === "light"
                        ? "btn btn-outline-dark border-0 mx-auto"
                        : "btn btn-outline-light border-0 mx-auto"
                    }
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    variant={
                      theme === "light"
                        ? "btn btn-outline-dark border-0 mx-auto"
                        : "btn btn-outline-light border-0 mx-auto"
                    }
                    onClick={() =>
                      dispatch(addToCart({ ...product, quantity: quantity }))
                    }
                  >
                    <i className="bi bi-cart me-1" />
                  </Button>
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    variant={
                      theme === "light"
                        ? "btn btn-outline-dark border-0 mx-auto"
                        : "btn btn-outline-light border-0 mx-auto"
                    }
                    onClick={() => handleToggleFavourite(product)}
                  >
                    <i
                      className={`bi ${
                        isFavourite ? "bi-heart-fill text-danger" : "bi-heart"
                      }`}
                    />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Row className="m-5">
        <Col>
          <h3>Related Products</h3>
        </Col>
        <Col className="text-end">
          <Link to="/Shop" className="text-decoration-none text-secondary">
            See all
          </Link>
        </Col>
      </Row>

      <Row className="m-5">
        {filteredProducts.slice(0, 4).map((p) => (
          <Col key={p.id} xs={12} md={6} lg={3}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}

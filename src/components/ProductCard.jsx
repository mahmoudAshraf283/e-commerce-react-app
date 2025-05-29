import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cart";
import { addToFavourite, removeFromFavourite } from "../store/slice/favourite";
import ThemeContext from "../context/theme";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listOfProducts = useSelector((state) => state.products.products);

  function handleNavigateToDetails(id) {
    navigate(`/ProductDetail/${id}`, { state: listOfProducts });
  }
  const favouriteItems = useSelector((state) => state.favourite.favourites);
  const isFavourite = favouriteItems.some((item) => item.id === product.id);
  function handleToggleFavourite(product) {
    if (isFavourite) {
      dispatch(removeFromFavourite(product));
    } else {
      dispatch(addToFavourite(product));
    }
  }

  return (
    <Card
      className={
        theme === "light"
          ? "bg-light m-2 border-0 shadow text-black"
          : "bg-black bg-gradient m-2 border-0 shadow text-white"
      }
    >
      <Card.Img variant="top" src={product.thumbnail} className="w-50 m-auto" />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>Price : {product.price} $</Card.Text>
        {product.stock !== 0 ? (
          <Card.Text className="text-success">In Stock</Card.Text>
        ) : (
          <Card.Text className="text-danger">Out of Stock</Card.Text>
        )}
        <Card.Text>
          Rating:
          {[...Array(5)].map((item, i) => (
            <span
              key={i}
              style={{ color: i < product.rating ? "gold" : "lightgray" }}
            >
              ★
            </span>
          ))}
        </Card.Text>

        <Stack direction="horizontal">
          <Link
            className={
              theme === "light"
                ? "btn btn-outline-dark border-0 mx-auto"
                : "btn btn-outline-light border-0 mx-auto"
            }
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          >
            <i className="bi bi-cart me-1" />
          </Link>
          <Link
            className={
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
          </Link>
          <Button
            variant={
              theme === "light"
                ? "btn btn-outline-dark border-0 mx-auto"
                : "btn btn-outline-light border-0 mx-auto"
            }
            onClick={() => handleNavigateToDetails(product.id)}
          >
            Details
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

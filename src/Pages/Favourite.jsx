import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite, clearFavourites } from "../store/slice/favourite";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductCard from "../components/ProductCard";

export default function Favourite() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.favourites);

  return (
    <div className=" m-5 text-center">
      <h2>Favourite Products</h2>
      {favourites.length === 0 ? (
        <p>You have no favourite products.</p>
      ) : (
        <>
          <Row>
            {favourites.map((f) => (
              <Col key={f.id} xs={12} md={6} lg={3}>
                <ProductCard product={f} />
              </Col>
            ))}
          </Row>
          <Button variant="warning" onClick={() => dispatch(clearFavourites())}>
            Clear All Favourites
          </Button>
        </>
      )}
    </div>
  );
}

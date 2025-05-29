import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../store/slice/cart";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ThemeContext from "../context/theme";
import { useContext } from "react";

export default function Cart() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "cart/calculateTotalPrice" });
  }, [cart, dispatch]);

  const handleIncrement = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(removeFromCart({ id: product.id, decrement: true }));
    } else {
      dispatch(removeFromCart({ id: product.id }));
    }
  };

  const handleNavigateToPurchase = () => {
    navigate("/purchase"); 
  };

  return (
    <div className="container my-5 text-center">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover className= {theme === "light" ? "table-light" : "table-dark"}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Subtotal ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity <= 1}
                      className="me-2"
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleIncrement(item)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          <Row>
            <Col>
              <Button variant="warning" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleNavigateToPurchase}>
                Purchase
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

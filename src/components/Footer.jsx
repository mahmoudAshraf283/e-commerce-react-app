import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import ThemeContext from "../context/theme";
import { useContext } from "react";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={theme === "light" ? "bg-light p-5 pb-2 text-black" : "bg-black p-5 pb-2 text-white"}>
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <h3 className="text-secondary">Shop</h3>
            <p>Cairo-Alexandria Desert Road<br />Kilo 5200</p>
          </Col>
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
            <h4 className="text-secondary">Links</h4>
            <ul className="list-unstyled">
              <li className="my-2"><Link to = "/" className={theme === "light" ? " text-decoration-none text-black" : " text-decoration-none text-white"}>Home</Link></li>
              <li className="my-2"><Link to = "/Shop" className={theme === "light" ? " text-decoration-none text-black" : " text-decoration-none text-white"}>Shop</Link></li>
              <li className="my-2"><Link to = "/Cart"className={theme === "light" ? " text-decoration-none text-black" : " text-decoration-none text-white"}>Cart</Link></li>
              <li className="my-2"><Link to = "/Favourite"className={theme === "light" ? " text-decoration-none text-black" : " text-decoration-none text-white"}>Favourite</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
            <h4 className="text-secondary">Contact Us</h4>
            <ul className="list-unstyled">
              <li className="my-2">+07775000</li>
              <li className="my-2">+07775000</li>
              <li className="my-2"><Link to="/"className={theme === "light" ? " text-decoration-none text-black" : " text-decoration-none text-white"}>email@gmail.com</Link></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <p className="text-center text-md-start">&copy; 2025 . All rights reserved.</p>
      </Container>
    </footer>
  );
}

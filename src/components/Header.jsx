import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ThemeContext from "../context/theme";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const cartHasItems = useSelector((state) => state.cart.cart.length > 0);
  const favouriteHasItems = useSelector(
    (state) => state.favourite.favourites.length > 0
  );
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={theme === "light" ? "bg-light" : "bg-black"}
      data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Shop">
              Shop
            </Nav.Link>
          </Nav>
          <Nav>
            {theme === "light" ? (
              <Link
                className="btn light border-0 text-start my-auto"
                onClick={handleThemeToggle}
              >
                <i className="bi bi-moon-fill"></i>
              </Link>
            ) : (
              <Link
                className="btn light border-0 text-start my-auto"
                onClick={handleThemeToggle}
              >
                <i className="bi bi-brightness-high-fill text-white"></i>
              </Link>
            )}
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/Register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/Favourite">
              <div className="icon-wrapper">
                <i className="bi bi-heart fs-5"></i>
                {favouriteHasItems && <span className="red-dot"></span>}
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/Cart">
              <div className="icon-wrapper">
                <i className="bi bi-cart fs-5"></i>
                {cartHasItems && <span className="red-dot"></span>}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

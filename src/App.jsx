import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import Favourite from "./Pages/Favourite";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Purchase from "./Pages/Purchase";
import ThemeContext from "./context/theme";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme=== "dark" ? "bg-dark text-white" : "bg-white text-black"}>
        <BrowserRouter>
          <Header />
          <div className="min-vh-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ProductDetail/:id" element={<ProductDetail />} />
              <Route path="/Shop" element={<Shop />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Favourite" element={<Favourite />} />
              <Route path="/Purchase" element={<Purchase />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

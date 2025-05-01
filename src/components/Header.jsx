import React from "react";
//import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
const Header = ({ handleOpen, open }) => {
//const navigate = useNavigate();

  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div className="me-3"></div>
        <div>
          <a className="navbar-brand brand-logo" href="/">
            {/* <Logo /> */}
            <img src="./image.png" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="/">
            {/* <Logo /> */}
            <img src="./image.png" alt="logo" />
          </a>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-top">
        <ul className="navbar-nav">
          <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
            <h1 className="welcome-text">
              Welcome to{" "}
              <span className="text-black fw-bold"></span>
            </h1>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          {/*
           onClick={() => {
            Cookies.remove("NgoWebToken");
            navigate("/adminlogin");
            //   }} */}
          <li
            className="text-dark border p-2 shadow"
          >
            <a>
              {" "}
              <i className="bi bi-door-open me-2 fw-bold"></i> Logout
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-bs-toggle="offcanvas"
          onClick={() => handleOpen(!open)}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;

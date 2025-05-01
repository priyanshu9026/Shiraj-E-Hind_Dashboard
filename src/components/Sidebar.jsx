import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/style.css";

const Sidebar = ({ open }) => {
  return (
    <nav
      className={`sidebar sidebar-offcanvas ${open && "active"}`}
      id="sidebar"
    >
      <ul className="nav">
        <li className="nav-item">
          <Link to={"/dashboard"} className="nav-link">
            <i className="bi bi-bar-chart-line mx-2 fw-bold"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/volunteers"} className="nav-link">
            <i className="bi bi-people mx-2 fw-bold"></i>
            <span className="menu-title">Volunteers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/milestones"} className="nav-link">
            <i className="bi bi-award mx-2 fw-bold"></i>
            <span className="menu-title">Milestones</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/donations"} className="nav-link">
            <i className="bi bi-cash-coin mx-2 fw-bold"></i>
            <span className="menu-title">Donations</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/events"} className="nav-link">
            <i className="bi bi-calendar-event mx-2 fw-bold"></i>
            <span className="menu-title">Events & Campaigns</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/beneficiaries"} className="nav-link">
            <i className="bi bi-person-heart mx-2 fw-bold"></i>
            <span className="menu-title">Beneficiaries</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/reports"} className="nav-link">
            <i className="bi bi-clipboard-data mx-2 fw-bold"></i>
            <span className="menu-title">Reports & Analytics</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/blog"} className="nav-link">
            <i className="bi bi-newspaper mx-2 fw-bold"></i>
            <span className="menu-title">Blog & Newsletter</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/settings"} className="nav-link">
            <i className="bi bi-gear mx-2 fw-bold"></i>
            <span className="menu-title">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  // const token = Cookies.get("BookClubToken");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container-scroller">
        <Header handleOpen={(data) => setOpen(data)} open={open} />
        <div className="container-fluid page-body-wrapper flex">
          <Sidebar open={open} /> 
          <div className="main-panel flex-1 w-full min-h-screen px-6 py-4 bg-gray-50">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
  
};

export default App;

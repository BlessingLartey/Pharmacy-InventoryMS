// Dashboard.js
import React from "react";
import SideBar from '../component/SideBar.jsx'
import Nav from "../component/Nav.jsx";
import { Outlet } from "react-router-dom";
import '../AllStyles/sidebar&navbar.css'

// import LabForm from "../page/LabForm";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <Nav /> */}
      <div className="main-content">
        <SideBar />
        
        {/* Add your main content here */}
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

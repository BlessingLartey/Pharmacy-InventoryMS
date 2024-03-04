// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  // CiHome,
  // CiUser,
  CiLineHeight,
  CiBitcoin,
  CiLollipop,
  CiSettings,
} from "react-icons/ci";
import brand_MedTrack from '../images/brand_MedTrack.svg'
import avatar from '../images/avatar.jpg'
import '../AllStyles/sidebar&navbar.css'

const Sidebar = () => {
  return (
    <div className="sidenav">
      <div className="medlogo">
        <img src={brand_MedTrack} alt="newLogo" />
        {/* <span>Medtrack</span> */}
      </div>

      {/* <img className="logo" src={logo} alt="logo" /> */}
      <div className="profile">
        <img src={avatar} alt="profile" />
        <h3>Ammah Kusiwaaa</h3>
        <p>Laboratory Department Head</p>
      </div>
      <ul>
        <li>
          <NavLink to="/dashboard/reports">
            <CiLineHeight />
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/laboratory">
            <CiBitcoin />
            Pharmacy
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/settings">
            <CiSettings />
            Settings
          </NavLink>
        </li>

        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;

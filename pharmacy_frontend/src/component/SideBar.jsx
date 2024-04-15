import React from "react";
import { NavLink } from "react-router-dom";
import { CiLineHeight, CiBitcoin, CiSettings } from "react-icons/ci";
import brand_MedTrack from "../images/brand_MedTrack.svg";
import avatar from "../images/avatar.jpg";
import "../AllStyles/sidebar&navbar.css";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <div className="medlogo">
        <img src={brand_MedTrack} alt="newLogo" />
      </div>

      <div className="profile">
        <img src={avatar} alt="profile" />
        <h3>Ammah Kusiwaaa</h3>
        <p>Pharmacy Department Head</p>
      </div>
      <ul>
        <li>
          <NavLink to="/app">
            <CiLineHeight />
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/app">
            <CiBitcoin />
            Pharmacy
          </NavLink>
        </li>
        <li>
          <NavLink to="/app">
            <CiSettings />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



import React from 'react'
import Avatar from '../images/avatar.jpg';
import { stack as Menu } from 'react-burger-menu';
import '../AllStyles/Nav.css'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom';

function PharmNav() {
  return (
    <div class="row">
    <div class="container-fluid">
            <div class="col-xl-2 col-lg-2" style={{marginLeft:"-15px"}}>
                <Menu>
                    <Link to="/"><img src={Logo} alt="Logo" class="sidebar-logo" style={{ height: "auto", width: 50, marginBottom: 50 }} /></Link>
                    <Link to="/profile" className="menu-item" >Profile</Link>
                    <Link to="/test" className="menu-item">Test</Link>
                    <Link to="/resources" className="menu-item" >Resources & Support</Link>
                    <Link to="/settings" class="menu-item">Settings</Link>
                    <Link to="/gethelp" href="menu-item">Get Help</Link>
                    <Link to="/" href="menu-item">Log out</Link>
                </Menu>
            </div>
            
        <nav class="nav navbar navbar-light navigation">
            <div class="navbar-text col-lg-8 col-xl-8">
                <h1>COVID-19 VIRTUAL</h1>
                <h1>DIAGNOSTIC PLATFORM</h1>
                <h6>AN ONLINE DIAGNOSTIC SYSTEM</h6>
            </div>
            <div class="drop">
                <div class="c-dropdown avatar_dropdown col-lg-2 col-xl-2">
                    <div class="c-avatar has-dropdown dropdown-toggle" id="dropdownMenuAvatar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="avatar__img" src={Avatar} alt="Name" />
                    </div>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuAvatar">
                        <Link to="/profile" class="dropdown-item">Edit Profile</Link>
                        {/* <a class="dropdown-item" href="#">Account Settings</a> */}
                        <Link to="/" class="dropdown-item">Log out</Link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    </div>
  )
}

export default PharmNav
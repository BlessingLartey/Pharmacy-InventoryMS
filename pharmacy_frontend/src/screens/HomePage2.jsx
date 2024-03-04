import React from 'react'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import Footer from '../component/Footer'
import '../AllStyles/login&signStyles.css'


function HomePage2() {
  return (

<>
<div>
        <div className="homepage">
          <div className="homepage-left">
            <img src={Logo} className="App-logo" alt="logo" />
            <h1
              style={{
                fontFamily: "Verdana",
                fontWeight: "bold",
                letterSpacing: "3px",

              }}
            >
              Pharmacy & Laboratory
            </h1>
            <h1
              style={{
                fontFamily: "Verdana",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1.3rem"
              }}
            >
              Inventory Management System
            </h1>
            <h6 style={{ letterSpacing: "2px" }}> Secure & accessible digital medical data</h6>
          </div>
          <div className="homepage-divider"></div>
          <div className="login-section">
            <div className="login-wrap">
              <div className="login-html">
                <input
                  id="tab-1"
                  type="radio"
                  name="tab"
                  className="sign-in"
                  checked
                />
                <label htmlFor="tab-1" className="tab">
                  Pharmary
                </label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" />
                <label htmlFor="tab-2" className="tab">
                  Laboratory Professionals
                </label>
                <div className="login-form">
                  <div className="sign-in-htm">
                    <div className="group">
                      <label htmlFor="username" className="label">
                        User ID
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="input input_anim"
                        // value={this.state.username}
                        name="username"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="emailaddress" className="label">
                        Email address
                      </label>
                      <input
                        id="emailaddress"
                        type="email"
                        className="input input_anim"
                        data-type="email"
                        // value={this.state.emailaddress}
                        name="emailaddress"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label">
                        Password
                      </label>
                      <input
                        id="pass"
                        type="password"
                        className="input input_anim"
                        data-type="password"
                        // value={this.state.password}
                        name="password"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label">
                        Confirm Password
                      </label>
                      <input
                        id="pass"
                        type="confirmpassword"
                        className="input input_anim"
                        data-type="confirmpassword"
                        // value={this.state.confirmpassword}
                        name="conformpassword"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <Link to="/profile">
                        <input
                          type="submit"
                          className="button"
                          value="Sign Up"
                        />
                      </Link>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                      <p>
                        Already have an account? <Link to="/">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="sign-up-htm">
                    <div className="group">
                      <label htmlFor="user" class="label">
                        User ID
                      </label>
                      <input
                        id="user"
                        type="text"
                        className="input input_anim"
                        // value={this.state.hospitalId}
                        name="hospitalId"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label">
                        Email Address
                      </label>
                      <input
                        id="pass"
                        type="email"
                        className="input input_anim"
                        // value={this.state.emailaddress}
                        name="emailaddress"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="pass" class="label">
                        Password
                      </label>
                      <input
                        id="pass"
                        type="password"
                        className="input input_anim"
                        data-type="password"
                        // value={this.state.password}
                        name="password"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label">
                        Confirm Password
                      </label>
                      <input
                        id="pass"
                        type="confirmpassword"
                        className="input input_anim"
                        data-type="confirmpassword"
                        // value={this.state.confirmpassword}
                        name="confirmpassword"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="group">
                      <a href="/professionalprofile">
                        <input type="submit" class="button" value="Sign Up" />
                      </a>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                      Already have an account?<Link to="/">Sign in</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

</>

    )
}

export default HomePage2
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import Footer from "../component/Footer";
import "../AllStyles/login&signStyles.css";

function LogIn() {
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
                paddingTop: "1rem",
              }}
            >
              Pharmacy
            </h1>
            <h1
              style={{
                fontFamily: "Verdana",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1.3rem",
                paddingTop: "0.4rem",
              }}
            >
              Inventory Management System
            </h1>
            <h6 style={{ letterSpacing: "2px", paddingTop: "0.9rem" }}>
              Secure & accessible digital medical data
            </h6>
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
                  Sign In
                </label>
                <input id="tab-2" name="tab" className="sign-up" />
                <label htmlFor="tab-2" className="tab"></label>
                <div className="login-form">
                  <div className="sign-in-htm">
                    <div class="group">
                      <label htmlFor="user" className="label">
                        Username
                      </label>
                      <input
                        id="user"
                        type="text"
                        className="input input_anim"
                        name="username"
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
                        name="password"
                      />
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    <div class="group">
                      <Link to="/app">
                        <input
                          type="submit"
                          className="button"
                          value="Sign In"
                        />
                      </Link>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                      <a href="#forgot">Forgot Password?</a>
                      <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                      </p>
                    </div>
                  </div>

                  <div className="sign-up-htm">
                    <div className="group">
                      <label for="user" className="label">
                        Username
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

                    {/* <div class="group">
                      <label for="pass" className="label">
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
                    </div> */}

                    <div class="group">
                      <label for="pass" className="label">
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
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        Keep me signed in
                      </label>
                    </div>
                    <div className="group">
                      <a href="/lab">
                        <input
                          type="submit"
                          className="button"
                          value="Sign In"
                        />
                      </a>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                      <a href="#forgot">Forgot Password?</a> <br />
                      Don't have account?
                      <Link to="/"> Sign up</Link>
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
  );
}

export default LogIn;

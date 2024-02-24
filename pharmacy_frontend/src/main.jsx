import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Hero from "./screens/Hero.jsx";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}

      <Hero />
    </Provider>
      <ToastContainer />
  </React.StrictMode>
);

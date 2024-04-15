import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import LogIn from "./LogIn.jsx";
import App from "../App.jsx";
import SignUp from "./SignUp.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="app" element={<App />} />
    </Route>
  )
);

export default function Hero() {
  return <RouterProvider router={router} />;
}

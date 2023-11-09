import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import AboutUs from "./containers/AboutUs";
import Login from "./containers/LogIn";
import Registration from "./containers/Registration";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
  </Routes>
);

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import AboutUs from "./containers/AboutUs";
import Login from "./containers/LogIn";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/registration" element={<Login/>}/>
    </Routes>
  );
}

export default App;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./containers/Home";
import AboutUs from "./containers/AboutUs";
import Events from "./containers/Events";
import Event from "./containers/Event";
import Trainers from "./containers/Trainers";
import Account from "./containers/Account";
import Login from "./containers/LogIn";
import Registration from "./containers/Registration";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => {
  useEffect(() => {
    axios.get("/")
      .then();
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<Event />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/account" element={<Account />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default App;

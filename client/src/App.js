import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import AboutUs from "./containers/AboutUs";
import Events from "./containers/Events";
import Event from "./containers/Event";
import AllUsers from "./containers/AllUsers";
import Client from "./containers/Client";
import Account from "./containers/Account";
import Login from "./containers/LogIn";
import Registration from "./containers/Registration";
import checkTokenExpired from "./utils/auth/checkTokenExpired";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => {
  checkTokenExpired();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<Event />} />
      <Route path="/clients" element={<AllUsers />} />
      <Route path="/clients/:userId" element={<Client />} />
      <Route path="/account" element={<Account />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default App;

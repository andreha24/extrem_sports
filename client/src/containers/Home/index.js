import React from "react";

import Team from "./Team";
import Feedbacks from "./Feedbacks";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import Footer from "../../components/Footer";
import mountains from "../../assets/mountains.jpg";

const Home = () => (
  <>
    <Header />
    <Intro
      paragraph="Welcome to the SPORTIFY"
      text="The world of health and safety in extreme
        sports! Our human health tracking system is designed specifically for those who prefer
        adrenaline-filled adventures. We will help you maximize your
        adventure sports fun by ensuring your fitness is reliably monitored and you are safe every step of the way."
      backgroundImage={mountains}
    />
    <Team />
    <Feedbacks />
    <Footer />
  </>
);

export default Home;

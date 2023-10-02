import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Services from "./Services";
import Intro from "../../components/Intro";
import skydiving from "../../assets/skydiving.jpeg"

const AboutUs = () => {
  return (
    <>
      <Header />
      <Intro
        paragraph="About Us"
        text="Our company is an innovative leader in health tracking
        systems for extreme sports athletes. We combine cutting-edge technology with a deep
        understanding of athletes' needs to provide our clients with reliable and unique solutions."
        backgroundImage={skydiving}
      />
      <Services />
      <Footer />
    </>
  );
};

export default AboutUs;
import React from "react";

import services from "./services";

import "./index.scss";

const Services = () => (
  <div className="service-wrapper">
    <span className="service-wrapper__paragraph">Our services</span>
    <div className="service-wrapper__services">
      {services.map(({ paragraph, text }) => (
        <div key={paragraph} className="service">
          <h2 className="service__paragraph">{paragraph}</h2>
          <span>{text}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Services;

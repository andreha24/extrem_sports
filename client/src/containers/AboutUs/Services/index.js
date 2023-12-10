import React from "react";
import { useTranslation } from "react-i18next";

import services from "./services";

import "./index.scss";

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="service-wrapper">
      <span className="service-wrapper__paragraph">Our services</span>
      <div className="service-wrapper__services">
        {services.map(({ id, block }) => (
          <div key={id} className="service">
            <h2 className="service__paragraph">{t(`aboutUsPage.ourService.${block}.paragraph`)}</h2>
            <span>{t(`aboutUsPage.ourService.${block}.text`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

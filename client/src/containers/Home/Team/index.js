import React from "react";
import Slider from "react-slick";

import team from "./consts";
import sliderSettings from "./sliderSettings";
import feedback from "../../../assets/people-feedback/Andrey_Sherstyuk.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const Team = () => {

  return (
    <div className="team__wrapper">
      <h1> Our Team </h1>
      <Slider {...sliderSettings}>
        {team.map(({
                          id,
                          name,
                          position,
                          desc,
                        }) => (
          <div key={id} className="team__container">
            <div className="team__container__info">
              <div className="team__container__info__user">
                <img src={feedback} alt="user" />
                <div>
                  <span>{name}</span>
                  <span>{position}</span>
                </div>
              </div>

              <span>{desc}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Team;
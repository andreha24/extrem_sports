import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

import feedback from "../../../assets/people-feedback/Andrey_Sherstyuk.jpg";

import "./index.scss";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/unAuth/serviceComments")
      .then((response) => {
        console.log(response);
        setFeedbacks(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="feedbacks-wrapper">
      <h1 className="feedbacks-wrapper__paragraph">Feedbacks</h1>

      <Marquee className="feedbacks-wrapper__content" gradientWidth={100} gradient speed={25}>
        {feedbacks.map(({ id, name, desc }) => (
          <div key={id} className="feedbacks-wrapper__content__block">
            <img src={feedback} alt="user" />
            <span>{name}</span>
            <span>{desc}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Feedbacks;
